import os
from datetime import datetime, timezone

try:
    from zoneinfo import ZoneInfo  # Python 3.9+
except Exception:  # pragma: no cover
    ZoneInfo = None  # type: ignore

DEFAULT_TZ = os.environ.get('TIMEZONE', 'Europe/Kyiv')


def to_local_time(dt: datetime | str | None, tz_name: str | None = None) -> datetime | None:
    if not dt:
        return None
    tz = tz_name or DEFAULT_TZ
    try:
        if isinstance(dt, str):
            # SQLite returns 'YYYY-MM-DD HH:MM:SS'
            dt = datetime.strptime(dt, '%Y-%m-%d %H:%M:%S')
        # assume UTC if naive
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        if ZoneInfo is None:
            return dt
        return dt.astimezone(ZoneInfo(tz))
    except Exception:
        return None


def to_local_time_str(dt: datetime | str | None, tz_name: str | None = None) -> str | None:
    local = to_local_time(dt, tz_name)
    if not local:
        return None
    return local.strftime('%Y-%m-%d %H:%M:%S')
