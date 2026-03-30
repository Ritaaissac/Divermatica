from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password):
    """Gera hash da senha"""
    return generate_password_hash(password)

def verify_password(password_hash, password):
    """Verifica se a senha bate com o hash"""
    return check_password_hash(password_hash, password)
