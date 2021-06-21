from application.extensions import apimanager
from application.models.model import User, GianHang
from application.extensions import auth


apimanager.create_api(collection_name='gianhang', model=GianHang,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    )
