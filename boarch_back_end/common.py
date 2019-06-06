from sqlalchemy.orm import sessionmaker


def all_fields_present(dict_object, fields):
    if len(dict_object) != len(fields):
        return False

    for field in fields:
        if field not in dict_object:
            return False

    return True


def get_session(base, engine):
    base.metadata.bind = engine
    db_session = sessionmaker(bind=engine)
    return db_session()
