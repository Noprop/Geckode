#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'geckode.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

    


if __name__ == '__main__':
    print("\nTop 5 types of potatoes:")
    print("1. Pan seared")
    print("2. Lemon Potatoes")
    print("3. Scalloped Potatoes")
    print("4. French Fries (Thick Cut)")
    print("5. Home Fries")
    main()
