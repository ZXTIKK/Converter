#include <iostream>
#include <cstdlib>
#include <string>
#include <filesystem>

namespace fs = std::filesystem;

const std::string REPO_URL = "https://github.com/ZXTIKK/Converter.git";
const std::string TARGET_DIR = "Converter_Project";

#ifdef _WIN32
    #define DEV_NULL " > nul 2>&1"
    #define CHCP_UTF8 "chcp 65001 > nul"
    #define OPEN_COMMAND "explorer"
#else
    #define DEV_NULL " > /dev/null 2>&1"
    #define CHCP_UTF8 "export LANG=en_US.UTF-8"
    #define OPEN_COMMAND "xdg-open"
#endif

bool checkGit() {
    return (std::system(("git --version" DEV_NULL)) == 0);
}

void installGit() {
    std::cout << ">>> Установка Git..." << std::endl;
#ifdef _WIN32
    std::system("winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements");
#elif __linux__
    if (std::system("command -v apt" DEV_NULL) == 0) {
        std::system("sudo apt update && sudo apt install -y git");
    } else {
        std::cout << "Пожалуйста, установите git вручную через ваш менеджер пакетов." << std::endl;
    }
#endif
}

void cloneRepository() {
    if (fs::exists(TARGET_DIR)) {
        std::cout << "⚠️ Папка " << TARGET_DIR << " уже существует. Пропускаю клонирование." << std::endl;
        return;
    }

    std::cout << ">>> Клонирование репозитория: " << REPO_URL << "..." << std::endl;
    std::string command = "git clone " + REPO_URL + " " + TARGET_DIR;
    
    if (std::system(command.c_str()) == 0) {
        std::cout << "✅ Проект успешно загружен в: " << TARGET_DIR << std::endl;
    } else {
        std::cout << "❌ Ошибка при клонировании. Проверьте интернет или права доступа." << std::endl;
    }
}

void openFolder() {
    std::cout << ">>> Открытие папки проекта..." << std::endl;
    std::string cmd = std::string(OPEN_COMMAND) + " " + TARGET_DIR;
    std::system(cmd.c_str());
}

int main() {
    std::system(CHCP_UTF8);

    std::cout << "========================================" << std::endl;
    std::cout << "       УСТАНОВЩИК КОНВЕРТЕРА 2.0        " << std::endl;
    std::cout << "========================================" << std::endl;

    if (!checkGit()) {
        std::cout << "⚠️ Git не обнаружен." << std::endl;
        installGit();

        if (!checkGit()) {
            std::cout << "ℹ️ Для того чтобы система 'увидела' Git, может потребоваться перезапуск программы." << std::endl;
#ifdef _WIN32
            std::cout << "Попытка выполнить прямую команду..." << std::endl;
#endif
        }
    }

    if (checkGit()) {
        std::cout << "✅ Git готов к работе." << std::endl;
        cloneRepository();
        openFolder();
    } else {
        std::cout << "❌ Не удалось запустить Git. Установите его вручную и перезапустите программу." << std::endl;
    }

    std::cout << "========================================" << std::endl;
    std::cout << "Нажмите Enter для выхода...";
    std::cin.ignore();
    std::cin.get();
    return 0;
}