class Config(object):
    DEBUG = True
    STATIC_URL = "static"
    SQLALCHEMY_DATABASE_URI = 'postgresql://ecommerce_user:123456@localhost:5432/ecommerce_db'
    AUTH_LOGIN_ENDPOINT = 'login'
    AUTH_PASSWORD_HASH = 'sha512_crypt'
    AUTH_PASSWORD_SALT = 'ruewhndjsa17heaw'
    SECRET_KEY = 'e2q8dhaushdauwd7qye'
    SESSION_COOKIE_SALT = 'dhuasud819wubadhysagd'