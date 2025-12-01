#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

bool hasDuplicate(vector<int> &nums)
{
    unordered_map<int, int> mp;
    for (auto i : nums)
    {
        mp[i]++;

        if (mp[i] > 1)
            return true;
    }
    return false;
}
int main()
{
    vector<int> input = {1, 2, 3, 3};
    auto output = hasDuplicate(input);
    cout << output;
}