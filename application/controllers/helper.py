import time
import uuid
import math
import hashlib
# import decimal
import datetime
import shortuuid
from random import choice
from hashids import Hashids
from sqlalchemy.ext import hybrid
from sqlalchemy.orm.query import Query
from string import ascii_uppercase, digits
from sqlalchemy.exc import NoInspectionAvailable
from sqlalchemy.ext.associationproxy import AssociationProxy
from sqlalchemy.orm import RelationshipProperty as RelProperty
from sqlalchemy.inspection import inspect as sqlalchemy_inspect


COLUMN_BLACKLIST = ('_sa_polymorphic_on', )


def generate_uuid():
    return str(uuid.uuid4())


def gen_secret_key(str_data):
    return hashlib.md5(str_data.encode('utf-8')).hexdigest()


def gen_revision():
    return math.floor(time.time())


def get_current_timestamp():
    return math.floor(time.time())


def validate_uuid(uid, version=4):
    try:
        if uuid.UUID(uid).version == version:
            return True
    except Exception as e:
        print("Exception: ", e)

    return False


def gen_short_id(length=36, prefix=None):
    short_uuid = shortuuid.ShortUUID().random(length=length)
    if prefix:
        short_uuid = prefix + "-" + str(short_uuid)
    return short_uuid.upper()


def gen_unique_id(length=36, prefix=None):
    salt = [''.join(choice(ascii_uppercase + digits) for _ in range(128))]
    hashid = Hashids(salt=salt[0], min_length=length)
    ts = math.floor(time.time() * 1000000)
    unique_id = hashid.encode(ts).strip().upper()
    if prefix:
        unique_id = prefix + "-" + unique_id
    return unique_id


def get_timestamp_start_of_day():
    date_time = datetime.datetime.now()
    date_time = date_time.strftime("%Y-%m-%d")
    date_time = datetime.datetime.strptime(date_time, "%Y-%m-%d")
    date_time = int(datetime.datetime.timestamp(date_time))

    return date_time


def get_timestamp_start_of_next_day():
    date_time = datetime.datetime.now() + datetime.timedelta(days=1)
    date_time = date_time.strftime("%Y-%m-%d")
    date_time = datetime.datetime.strptime(date_time, "%Y-%m-%d")
    date_time = int(datetime.datetime.timestamp(date_time))

    return date_time


def get_timestamp_end_of_day():
    date_time = datetime.datetime.now()
    date_time = date_time.strftime("%Y-%m-%d") + " 11:59:59"
    date_time = datetime.datetime.strptime(date_time, "%Y-%m-%d %H:%M:%S")
    date_time = int(datetime.datetime.timestamp(date_time))

    return date_time


async def convert_key_to_lowercase(data):
    new_dict = dict((k.lower(), v) for k, v in data.items())

    return new_dict


async def convert_datetime_to_timestamp(date_time, time_format="%Y-%m-%d"):
    if type(date_time) != str:
        date_time = date_time.strftime(time_format)
    date_time = datetime.datetime.strptime(date_time, time_format)
    date_time = int(datetime.datetime.timestamp(date_time))

    return date_time


async def convert_str_datetime_to_timestamp(date_time, format_convert="%Y-%m-%d"):
    try:
        if type(date_time) != str:
            date_time = date_time.strftime(format_convert)
        date_time = datetime.datetime.strptime(date_time, format_convert)
        date_time = int(datetime.datetime.timestamp(date_time))

        return date_time
    except Exception as e:
        print("Exception: ", e)

    return None


async def convert_timestamp_to_str_datetime(day_timestamp):
    day_time = datetime.datetime.fromtimestamp(day_timestamp)
    str_day_time = day_time.strftime("%Y-%m-%d")
    return str_day_time

async def get_year_from_timestamp(day_timestamp):
    date_string = await convert_timestamp_to_str_datetime(day_timestamp=day_timestamp)
    return date_string[0:4]

def get_timestamp_start_of_day_from_timestamp(day_timestamp):
    day_time = datetime.datetime.fromtimestamp(day_timestamp)
    str_day_time = day_time.strftime("%Y-%m-%d")
    date_time = datetime.datetime.strptime(str_day_time, "%Y-%m-%d")
    date_time = int(datetime.datetime.timestamp(date_time))

    return date_time


def get_current_year():
    today = datetime.datetime.now()
    return today.year


def pagination(request, instances):
    if type(instances) == dict:
        objects = instances
        page_num = 1
        total_pages = 1
        num_results = 1
    else:
        num_results = len(instances)
        results_per_page = int(request.args.get('results_per_page', 10))

        if results_per_page is None or results_per_page <= 0:
            results_per_page = 10

        page_num = int(request.args.get('page', 1))
        start = (page_num - 1) * results_per_page
        end = min(num_results, start + results_per_page)
        total_pages = int(math.ceil(num_results / results_per_page))

        objects = [to_dict(x) for x in instances[start:end]]

    return dict(data=objects, page=page_num, total_pages=total_pages, num_results=num_results)


def is_mapped_class(cls):
    try:
        sqlalchemy_inspect(cls)
        return True
    except Exception as e:
        print("Exception: ", e)
        return False


def is_like_list(instance, relation):
    """Returns ``True`` if and only if the relation of `instance` whose name is
    `relation` is list-like.

    A relation may be like a list if, for example, it is a non-lazy one-to-many
    relation, or it is a dynamically loaded one-to-many.

    """
    if relation in instance._sa_class_manager:
        return instance._sa_class_manager[relation].property.uselist
    elif hasattr(instance, relation):
        attr = getattr(instance._sa_instance_state.class_, relation)
        if hasattr(attr, 'property'):
            return attr.property.uselist
    related_value = getattr(type(instance), relation, None)
    if isinstance(related_value, AssociationProxy):
        local_prop = related_value.local_attr.prop
        if isinstance(local_prop, RelProperty):
            return local_prop.uselist
    return False


def to_dict(instance, deep=None, exclude=None, include=None, exclude_relations=None, include_relations=None, include_methods=None):
    if (exclude is not None or exclude_relations is not None) and (include is not None or include_relations is not None):
        raise ValueError('Cannot specify both include and exclude.')
    # Create a list of names of columns, including hybrid properties
    instance_type = type(instance)
    try:
        inspected_instance = sqlalchemy_inspect(instance_type)
        column_attrs = inspected_instance.column_attrs.keys()
        descriptors = inspected_instance.all_orm_descriptors.items()
        hybrid_columns = [k for k, d in descriptors
                          if d.extension_type == hybrid.HYBRID_PROPERTY
                          and not (deep and k in deep)]
        columns = column_attrs + hybrid_columns
    except NoInspectionAvailable:
        return instance
    # Filter the columns based on exclude and include values
    if exclude is not None:
        columns = (c for c in columns if c not in exclude)
    elif include is not None:
        columns = (c for c in columns if c in include)
    # Create a dictionary mapping column name to value
    result = dict((col, getattr(instance, col)) for col in columns
                  if not (col.startswith('__') or col in COLUMN_BLACKLIST))
    # Add any included methods
    if include_methods is not None:
        for method in include_methods:
            if '.' not in method:
                value = getattr(instance, method)
                # Allow properties and static attributes in include_methods
                if callable(value):
                    value = value()
                result[method] = value
    # Check for objects in the dictionary that may not be serializable by default.
    # Convert datetime objects to ISO 8601 format, convert UUID objects to hexadecimal strings, etc.
    for key, value in result.items():
        if isinstance(value, (datetime.date, datetime.time)):
            result[key] = value.isoformat()
        elif isinstance(value, uuid.UUID):
            result[key] = str(value)
        # elif isinstance(value, decimal.Decimal):
        #     result[key] = float(value)
        elif key not in column_attrs and is_mapped_class(type(value)):
            result[key] = to_dict(value)
    # Recursively call _to_dict on each of the `deep` relations
    deep = deep or {}
    for relation, rdeep in deep.items():
        # Get the related value so we can see if it is None, a list, a query (as specified by a dynamic relationship loader), or an actual
        # instance of a model.
        relatedvalue = getattr(instance, relation)
        if relatedvalue is None:
            result[relation] = None
            continue
        # Determine the included and excluded fields for the related model.
        newexclude = None
        newinclude = None
        if exclude_relations is not None and relation in exclude_relations:
            newexclude = exclude_relations[relation]
        elif include_relations is not None and relation in include_relations:
            newinclude = include_relations[relation]
        # Determine the included methods for the related model.
        newmethods = None
        if include_methods is not None:
            newmethods = [method.split('.', 1)[1] for method in include_methods if method.split('.', 1)[0] == relation]
        if is_like_list(instance, relation):
            result[relation] = [to_dict(inst, rdeep, exclude=newexclude, include=newinclude, include_methods=newmethods)
                                for inst in relatedvalue]
            continue
        # If the related value is dynamically loaded, resolve the query to get the single instance.
        if isinstance(relatedvalue, Query):
            relatedvalue = relatedvalue.one()
        result[relation] = to_dict(relatedvalue, rdeep, exclude=newexclude, include=newinclude, include_methods=newmethods)

    return result


def valid_string_id(id_string):
    try:
        accept_characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
                             "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_", "@", "/", "|"]
        check = True
        for i in id_string:
            if i not in accept_characters:
                check = False
                return check

        return check
    except Exception as e:
        print("Exception: ", e)

    return False
