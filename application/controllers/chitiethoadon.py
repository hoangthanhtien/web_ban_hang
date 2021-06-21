from application.extensions import apimanager
from application.models.model import ChiTietHoaDon
from application.extensions import auth


apimanager.create_api(collection_name='chitiethoadon', model=ChiTietHoaDon,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    )
