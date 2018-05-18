import json

from io import BytesIO


def test_ping(app):
    client = app.test_client()
    resp = client.get('/ping')
    data = json.loads(resp.data.decode())
    assert resp.status_code == 200
    assert 'records' in data['message']
    assert 'success' in data['status']


def test_add_user(app):
    """Ensure a new user can be added to the database."""
    with app.test_client() as client:
        data = {
            'name': 'test',
            'foo': 'bar',
            'image_1': (BytesIO(b'my file contents'), "image1.jpg")
        }
        response = client.post('/upload', content_type='multipart/form-data', data=data)
        assert response.status_code == 204
