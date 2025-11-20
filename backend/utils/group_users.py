from django.core.cache import cache

def _key(group_name):
    return f"group_users:{group_name}"

def get_group_users(group_name):
    return cache.get(_key(group_name), list())

def add_user_to_group(group_name, user_id):
    users = get_group_users(group_name)
    users.append(user_id)
    cache.set(_key(group_name), users, timeout=None)

def remove_user_from_group(group_name, user_id):
    users = get_group_users(group_name)
    users.remove(user_id)
    cache.set(_key(group_name), users, timeout=None)