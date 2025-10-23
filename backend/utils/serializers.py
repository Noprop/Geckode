def create_order_by_choices(choices, operators=['', '+', '-']):
    return [f"{op}{choice}" for op in operators for choice in choices]