import pytest

from app import create_app

app = create_app()


@app.cli.command()
def test():
    """Runs the tests."""
    pytest.main(['-s', 'tests.py'])

