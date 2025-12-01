#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

/** LOGIC:
 * Map stores indices of elements while looping
 * if difference is found in map
 * then return the index of that and current loop iterator
 */

vector<int> twoSum(vector<int> &nums, int target)
{
    int n = nums.size();
    unordered_map<int, int> mp;

    for (int i = 0; i < n; i++)
    {
        int complement = target - nums[i];

        // If key not exist -> mp.end() else return iterator
        if (mp.find(complement) != mp.end())
        {
            return {mp[complement], i};
            }

        mp[nums[i]] = i;
    }
    return {-1, -1};
}

int main()
{
    vector<int> input = {3, 4, 5, 6};
    int target = 7;
    auto output = twoSum(input, target);
    for (auto i : output)
        cout << i << ",";
}