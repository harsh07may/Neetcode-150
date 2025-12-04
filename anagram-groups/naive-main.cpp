#include <iostream>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

/** LOGIC:
 * Anagrams become the same when you sort them; [ATE, TEA, EAT] = AET
 * Sort and group each word, use that as key in Map.
 * Hashmap -> [AET] : [ATE, TEA, EAT]
 *
 * Then, Insert value of each KEY -> Vector.
 * Vector -> [ [ATE, TEA, EAT], [["ACT", "CAT"],... ]
 *
 * Time : O(m * nlogn)
 */
vector<vector<string>> groupAnagrams(vector<string> &strs)
{
    unordered_map<string, vector<string>> res;
    for (const auto &s : strs)
    {
        string sortedS = s;
        sort(sortedS.begin(), sortedS.end());
        res[sortedS].push_back(s);
    }
    vector<vector<string>> result;
    for (auto &pair : res)
    {
        result.push_back(pair.second);
    }
    return result;
}

int main()
{
    vector<string> input = {"act", "pots", "tops", "cat", "stop", "hat"};
    auto output = groupAnagrams(input);

    for (auto i : output)
    {
        for (auto j : i)
        {
            cout << j << " ";
        }
        cout << endl;
    }

    cout << to_string(80);
}