import logging
import uuid

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, IMAGES, configure_uploads
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import JSONB, UUID

import config

db = SQLAlchemy()
migrate = Migrate()
mail = Mail()

# Configure the image uploading via Flask-Uploads
images = UploadSet('photos', extensions=('jpg', 'pdf'))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    guid = db.Column(UUID(as_uuid=True), default=lambda: uuid.uuid4().hex)
    form = db.Column(JSONB)
    images = db.relationship('Image', backref='user', lazy=True)


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('user.id', ondelete=u'CASCADE', onupdate=u'CASCADE'),
                        nullable=False)
    filename = db.Column(db.String, default=None, nullable=True)


def create_app(**kwargs):
    app = Flask(__name__)
    app.logger.setLevel(logging.DEBUG)
    CORS(app)
    init_config(app, **kwargs)
    db.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db)
    configure_uploads(app, images)

    @app.route('/ping/', methods=['GET'])
    def ping_pong():
        app.logger.debug('Healthcheck called')
        q = db.session.query(User)
        users = get_count(q)
        return jsonify({
            'status': 'Epic success',
            'message': '{0} records currently in database'.format(users)
        })

    @app.route('/upload/', methods=['POST'])
    def upload_file():
        form = request.form
        user = User(form=form)
        db.session.add(user)
        for upload in request.files.getlist('blob') + request.files.getlist('pdf'):
            filename = images.save(upload)
            img = Image(filename=filename)
            user.images.append(img)
            db.session.add(img)
        db.session.commit()
        return jsonify({
            'uuid': user.guid
        })

    @app.route('/send_id/', methods=['POST'])
    def send_id():
        json = request.get_json()
        send_email(json['email'], 'Deine ID zum OpenSCHUFA Upload',
                   'uuid', uuid=json['uuid'])
        return '', 204

    def send_email(to, subject, template, **kwargs):
        msg = Message(subject, recipients=[to])
        msg.body = render_template(template + '.txt', **kwargs)
        msg.html = render_template(template + '.html', **kwargs)
        try:
            mail.send(msg)
            app.logger.debug('Mail sent to {0}'.format(to))
        except Exception as e:
            app.logger.error('Sending mail failed {0}'.format(e))

    def get_count(q):
        count_q = q.statement.with_only_columns([func.count()]).order_by(None)
        count = q.session.execute(count_q).scalar()
        return count

    return app


def init_config(app, **kwargs):
    # Read default configuration
    app.config.from_object(config)
    # Try to read user configuration in instance directory
    app.config.from_pyfile('config.py', silent=True)
    if 'config' in kwargs:
        app.config.from_object(kwargs['config'])
