#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

bool isAnagram(string s, string t)
{

    if (s.length() != t.length())
        return false;

    //! This can be simplified to use 1 map.
    //! Increment on s, decrement on t. ie. mp[char] = 0 on match.
    unordered_map<char, int> mps;
    unordered_map<char, int> mpt;

    for (char c : s)
        mps[c]++;
    for (char c : t)
        mpt[c]++;

    return mps == mpt;
}

int main()
{
    string input1 = "racecar";
    string input2 = "carrace";
    auto output = isAnagram(input1, input2);
    cout << output;
}