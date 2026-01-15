#include <iostream>
#include <string>
#include <cstdio>

#ifdef _WIN32
    #define POPEN _popen
    #define PCLOSE _pclose
    #define DEV_NULL " > nul 2>&1"
#else
    #define POPEN popen
    #define PCLOSE pclose
    #define DEV_NULL " > /dev/null 2>&1"
#endif

std::string getGitHash(const std::string& command) {
    char buffer[128];
    std::string result = "";
    FILE* pipe = POPEN(command.c_str(), "r");
    if (!pipe) return "ERROR";
    
    while (fgets(buffer, sizeof(buffer), pipe) != NULL) {
        result += buffer;
    }
    PCLOSE(pipe);
    
    if (!result.empty() && result.back() == '\n') result.pop_back();
    return result;
}

int main() {
    std::cout << "Checking for updates..." << std::endl;
    std::system(("git fetch" DEV_NULL));

    std::string local = getGitHash("git rev-parse HEAD");
    std::string remote = getGitHash("git rev-parse @{u}");

    if (local == remote) {
        std::cout << "Up to date!" << std::endl;
    } else {
        std::cout << "New version available on GitHub!" << std::endl;
    }

    return 0;
}