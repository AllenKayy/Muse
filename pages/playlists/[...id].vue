<template lang="">
    <div class="w-full flex flex-col items-center gap-5 bg-gray-800 h-full p-4 max-sm:p-2 overflow-y-scroll">
        <!-- Playlist Poster -->
        <div class="w-full h-[20vh]">
            <!-- <img class="w-full h-full object-cover" :src="playListImg" alt=""> -->
            <h1 class="text-3xl font-sans font-black text-white">{{playList?.[0]?.track?.name ?? name}}</h1>
        </div>

        <!-- Playlist controls -->
        <!-- <div class="w-full flex justify-between items-center">
            <div class="flex gap-6 max-sm:gap-3 items-center">
                <div class="text-green-600 w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px] rounded-full">
                    <IconPlay cls="w-full h-full" />
                </div>
                <div class="text-gray-400">
                    <IconFavourite cls="w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px]" />
                </div>
                <div class="text-gray-400">
                    <IconMenu cls="w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px]" />
                </div>
            </div>


            <div>

            </div>
        </div> -->
        <!-- Playlist controls -->

        <!-- List -->
        <div class="w-full h-[fit-content] flex flex-col gap-3 items-center">
            <!-- List Header -->
            <div class="w-full border-b-2 border-b-gray-400 py-2 flex justify-between items-center px-4 max-sm:px-1">
                <div class="text-gray-400 flex gap-2 max-sm:text-sm">
                    <span>#</span>
                    <span>Title</span>
                </div>

                <span class="text-gray-400 max-sm:text-sm">Plays</span>

                <div class="text-gray-400">
                    <IconDuration cls="w-[25px] h-[25px]" />
                </div>
            </div>
            <!-- List Header -->

            <!-- List Body -->
           
            <div v-if="playList?.[0]?.track?.playcount/1000000 !== 'NaN'" @click="selectSong()" class="w-full py-2 flex justify-between items-center px-4 max-sm:px-1 cursor-pointer hover:bg-gray-950 rounded-md">
               <div class="flex gap-2 text-gray-400">
                    <span class="max-sm:text-sm">1</span>

                    <div class="w-full flex max-sm:flex-col gap-3 max-sm:gap-1 justify-start items-center max-sm:items-start rounded-md  max-sm:p-1 cursor-pointer">
                    <div class="w-[50px] h-[50px] max-sm:w-[35px] max-sm:h-[35px] rounded-md overflow-hidden">
                        <img class="w-full h-full object-contain" :src="track?.album?.images?.[0]?.url" />
                    </div>
                    <div class="flex flex-col gap-3 max-sm:gap-1.5">
                        <span class="text-white max-sm:text-sm">{{playList?.[0]?.track?.name}}</span>
                        <div class="flex items-center gap-1">
                            <span v-for="artist in playList?.[0]?.track?.artists?.items" class="text-gray-400 text-sm">{{artist?.profile.name}}</span>
                        </div>
                    </div>
                </div>
               </div>

                <span class="text-gray-400 max-sm:text-sm">{{`${track?.popularity}`}}</span>

                <span class="text-gray-400 max-sm:text-sm">{{track?.duration_ms}}</span>
            </div>
            <!-- List Body -->
        </div>
        <!-- List -->

        <!-- Section Footer -->
        <span class="text-gray-400 text-base lg:text-lg lg:font-semibold font-normal mt-1 mb-10 lg:mb-14 pb-2 text-center">&copy; 2023 Muse</span>
        <!-- Section Footer -->
    </div>
</template>
<script setup>
const track = ref('');
const playListImg = ref('');
const state = ref('pending');

console.log()

const { id } = useRoute().params;
const trackId = id[0];

const selectSong = () => {
    // console.log(preview_url.value)
    // console.log(JSON.parse(localStorage.getItem('currentSong')))
    // localStorage.setItem('currentSong', JSON.stringify({ ...playList.value?.[0], preview_url: preview_url.value, playListImg: playListImg.value }))
    // console.log(JSON.parse(localStorage.getItem('currentSong')))
    console.log('track.value', track.value)
    localStorage.removeItem('currentSong');
    localStorage.setItem('currentSong', JSON.stringify(track.value))
    // localStorage.setItem('currentSong', track.value);
    // console.log('track.value', track.value)
}

const fromatMilliSec = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedDuration = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} s`;
    return formattedDuration;
}

// const getPlayList = async () => {
//     // const url = `https://spotify23.p.rapidapi.com/album_tracks/?id=${trackId}&offset=0&limit=300`;
//     // const options = {
//     //     method: 'GET',
//     //     headers: {
//     //         'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//     //         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     //     }
//     // };
//       console.log('getting playlist')
//     const url = `https://spotify81.p.rapidapi.com/album_tracks?id=${trackId}&offset=0&limit=300`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//             'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
//         }
//     };

//     try {
//         state.value = 'loading';
//         const response = await fetch(url, options);
//         const result = await response.json();
//         playList.value = result?.data?.album?.tracks?.items;
//         console.log('playList.value', playList.value)
//     } catch (error) {
//         console.error(error);
//     } finally {
//         state.value = 'not-loading';
//     }
// }
// const getPlayListAgain = async () => {
//     // const url = `https://spotify23.p.rapidapi.com/album_tracks/?id=${trackId}&offset=0&limit=300`;
//     // const options = {
//     //     method: 'GET',
//     //     headers: {
//     //         'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//     //         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     //     }
//     // };

//     const url = `https://spotify81.p.rapidapi.com/tracks?ids=${trackId}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//             'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
//         }
//     };

//     try {
//         state.value = 'loading';
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log('result', result);
//         duration.value = result?.tracks?.[0]?.duration_ms;
//         plays.value = result?.tracks?.[0]?.album?.total_tracks;
//         name.value = result?.tracks?.[0]?.name;
//         img.value = result?.tracks?.[0]?.images?.[0]?.url;
//         preview.value = result?.tracks?.[0]?.preview_url;
//         console.log('preview', preview)

//     } catch (error) {
//         console.error(error);
//     } finally {
//         state.value = 'not-loading';
//     }
// }

// const getPlayListImg = async () => {
//     //  const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${trackId}&offset=0&limit=100`;
//     // const options = {
//     //     method: 'GET',
//     //     headers: {
//     //         'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//     //         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     //     }
//     // };
//      const url = `https://spotify81.p.rapidapi.com/tracks?ids=${trackId}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//             'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
//         }
//     };

//     try {
//         state.value = 'loading';
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log('result', result);
//         // const matchItem = result?.items?.find(item => item?.track?.album?.id == trackId);
//         // playListImg.value = matchItem?.album?.images?.[0]?.url;
//         // console.log(matchItem, playListImg.value)
//         // console.log(result, playListImg.value)
//         playListImg.value = response?.traks?.[0]?.album?.images?.[0]?.url;
//     } catch (err) {
//         console.log(err)
//     }
// }

// onMounted(() => {
//     getPlayList();
//     getPlayListImg();
//     if (playList?.value == null) {
//         getPlayListAgain();
//     }
// })

const getTrack = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    console.log('track.value', data)
    track.value = data;
}

const getPlayListImg = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    console.log('track.value', data)
    track.value = data;
}

onMounted(() => {
    getTrack();

})



</script>
<style lang="">
    
</style>