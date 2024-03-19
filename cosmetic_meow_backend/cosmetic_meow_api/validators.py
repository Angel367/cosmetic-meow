def product_code_code_validator(input_string):
    pattern = r'^[0-9A-Z]+$'
    import re
    if not re.match(pattern, input_string):
        raise ValueError('Код должен состоять из цифр и заглавных букв латинского алфавита')
    if not len(input_string) == 16:
        raise ValueError('Код должен состоять из 16 символов')
