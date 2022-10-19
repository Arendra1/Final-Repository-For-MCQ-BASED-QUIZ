<template>
  <div class="outermost h-[230vh] bg-[#131417] overflow-x-hidden flex flex-col justify-center items-center md:h-[130vh] lg:h-[100vh] xl:h-[220vh] 2xl:h-[130vh]">
    <h1 class="font-sans text-2xl text-green-500 font-bold flex justify-center mt-10 mb-2">Welcome to <span
        class="text-yellow-500 ml-2"> LeadBoard</span></h1>
    <p v-if="flag"> {{ getData() }}</p>

    <!-- Table Section Starts -->
    <div class="table h-80  w-24  bg-[#131417] p-2  md:w-full">
      <div class="heading text-white flex justify-center items-center font-bold text-2xl  font-mono  px-40">

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg border-2 border-white w-80 md:w-[90vw]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Country
                </th>
                <th scope="col" class="py-3 px-6">
                  Rank
                </th>
                <th scope="col" class="py-3 px-6">
                  Score
                </th>
              </tr>
            </thead>
            <tbody class="table_body" id="UsersInfo">

              <tr v-for="(user,index) in tableInfo" :key="index" class="bg-[#131417] border-b   dark:border-gray-700">
                <td class="py-4 px-6 ">
                  {{user.name}}
                </td>
                <td class="py-4 px-6">
                  {{user.country}}
                </td>
                <td class="py-4 px-6">
                  {{user.rank}}
                </td>
                <td class="py-4 px-6">
                  {{user.score}}
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>


    <!-- Table section End -->


  </div>
</template>

<script>
import axios from 'axios';
import Config from '../config.js';

export default {
  name: 'LeaderBoardPage',
  data() {
    return {
      score: 0,
      success: true,
      flag: true,
      tableInfo: [],
      ranks: []

    }
  },
  methods: {
    async getData() {
      this.flag = false;
      try {
        const result = await axios.get(`${Config.base_url}/user/all-users`);
        const Users = await result.data.users;

        console.log(Users);
        Users.sort((a, b) => b.score - a.score);
        let rank = 0;

        Users.forEach(async (user, index) => {
          if (index > 0 && Users[index - 1].score === Users[index].score) {
            rank;
          }
          else {
            rank++;
          }
          let score = user.score;
          let name = user.name;
          let country = user.country;
          let tempObj = { name, country, rank, score };

          this.tableInfo.push(tempObj);

        });

      } catch (error) {
        console.log(error);
      }

    }
  }

}

</script>

<style>

</style>