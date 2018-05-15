import os
import shutil

import pytest

from app import create_app, db
from config import APP_ROOT


class Config(object):
    DEBUG = False
    TESTING = True
    CACHE_NO_NULL_WARNING = True  # silence Flask-Cache warning
    SQLALCHEMY_DATABASE_URI = os.environ.get('OPENSCHUFA_DATABASE_TEST_URL')
    UPLOADED_PHOTOS_DEST = APP_ROOT + '/media/test/'


@pytest.fixture(scope='session', autouse=True)
def app():
    config = Config()
    app = create_app(config=config)
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()
        shutil.rmtree(os.path.join(APP_ROOT, 'media/test'))

