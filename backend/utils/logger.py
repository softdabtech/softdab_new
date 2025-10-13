"""
Конфигурация логирования
"""
import logging
import os
from datetime import datetime

def setup_logger(name: str) -> logging.Logger:
    """
    Настройка логгера с ротацией файлов по дням
    """
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Создаем директорию для логов если её нет
    log_dir = "logs"
    os.makedirs(log_dir, exist_ok=True)

    # Формат логов
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    # Файловый хендлер с датой в имени файла
    log_file = os.path.join(
        log_dir,
        f"{name}_{datetime.now().strftime('%Y%m%d')}.log"
    )
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    # Консольный хендлер
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    return logger

# Создаем логгер для контактной формы
contact_logger = setup_logger('contact_form')