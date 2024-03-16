const express = require('express');
const { getChannelList, getVideos  } = require('../middleware/api');
const channelData = express.Router();
const getchnnelData = express.Router();
const videos = express.Router();
const getVideo = express.Router();
const getchannelData = express.Router();
const admin = require('firebase-admin');

channelData.get('', async(req, res) =>{
    try {
        const channelData = await getChannelList();

        const Data = {
            title : channelData.snippet.title ,
            description: channelData.snippet.description,
            publishDate: channelData.snippet.publishedAt ? channelData.snippet.publishedAt : null,
            thumbnil: channelData.snippet.thumbnails.default.url,
            viewCount: channelData.statistics.viewCount,
            subscriptionCount: channelData.statistics.subscriberCount || 0,
            videoCount: channelData.statistics.videoCount,
        }

        const batch = admin.firestore().batch();
        const channelsRef = admin.firestore().collection("channels");
        await channelsRef.add(Data);
        
        res.json({});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message})
    }
})

getchannelData.get('', async(req, res) => {
    try {
        const channelData = await admin.firestore().collection('channels').get();
        const channels = channelData.docs.map(doc => doc.data());
        res.json(channels);

    } catch (error) {

    }
})

videos.get('', async(req, res) =>{
    try {
        const videoUrls = await getVideos();

        const batch = admin.firestore().batch();
        const videoRef = admin.firestore().collection("videos");

        videoUrls.forEach((url) => {
            batch.set(videoRef.doc(), { url: url})
        });
        await batch.commit();
        res.json(videoUrls);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

getVideo.get('', async(req, res) =>{
    try{

        const videoUrl = await admin.firestore().collection('videos').get();
        
        const videos = videoUrl.docs.map(doc => doc.data().url);
        
        // res.json(videos);
        res.json(videos);

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = {
    home: channelData,
    videos: videos,
    getVideos: getVideo,
    getchannelData: getchannelData

}