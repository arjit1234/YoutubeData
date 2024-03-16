const axios = require('axios')
const channel = require('../routes/channel')
const { response } = require('express')



async function getChannelList() {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: CHANNEL_ID,
          key: API_KEY,
        },
      },
    )
    console.log(response.data.items[0].contentDetails.relatedPlaylists.uploads)
    const data = {
      id: response.data.items[0].id,
      snippet: response.data.items[0].snippet,
      contentDetails: response.data.items[0].contentDetails,
      statistics: response.data.items[0].statistics,
    }

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getVideos() {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          part: 'contentDetails',
          id: CHANNEL_ID,
          key: API_KEY,
        },
      },
    )

    const uploadsPlaylistId = response.data.items[0].contentDetails.relatedPlaylists.uploads
    console.log(uploadsPlaylistId);
    const playlistResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: 'contentDetails',
          playlistId: uploadsPlaylistId,
          key: API_KEY,
          maxResults: 50,
        },
      },
    )
    const videoIds = playlistResponse.data.items.map(
      (item) => item.contentDetails.videoId,
    )
    const videoUrls = videoIds.map(
      (videoId) => `https://www.youtube.com/watch?v=${videoId}`,
    )

    return videoUrls
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  getChannelList: getChannelList,
  getVideos: getVideos,
}
