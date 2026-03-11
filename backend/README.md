# Backend (Django)

## Running tests

From the `backend/` directory:

```bash
python -m pip install -r requirements.txt
python -m pytest
```

### Useful variations

```bash
# Run a single file
python -m pytest tests/test_projects_api.py

# Run tests matching a substring
python -m pytest -k fork

# More verbose output on failures
python -m pytest -vv
```

## Notes

- Tests are configured via `backend/pytest.ini` and use `DJANGO_SETTINGS_MODULE=geckode.settings` (which currently pulls in `geckode.settings.dev`).
- Authentication in API tests uses your Bearer JWT flow (`accounts.authentication.JWTAuthentication`) via shared fixtures in `backend/tests/conftest.py`.

