import React from 'react'
import './style.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import videos from '../Videos/videos'

const Dashboard = () => {
  const [channelData, setChannelData] = useState([])
  const [videoData, setVideoData] = useState([])

  const fetchChannel = async () => {
    try {
      const response = await axios.get('/api/getchannelData')
      setChannelData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/getVideos')
      setVideoData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChannel()
    fetchVideos()
  }, [])
  console.log(channelData);
  return (
    <div>
      <div className="heading">
        <h3>{ channelData[0]?.description }</h3>
      </div>
      {/* Main Content */}
      <div className="main-container">
        <div className="main">
          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">
                  {channelData[0]?.viewCount || 0}
                </h2>
                <h2 className="topic">Views</h2>
              </div>
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">
                  {channelData[0]?.subscriptionCount || 0}
                </h2>
                <h2 className="topic">Subscriber Count</h2>
              </div>
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">320</h2>
                <h2 className="topic">Comments</h2>
              </div>
            </div>

            <div className="box box4">
              <div className="text">
                <p>{channelData[0]?.publishDate}</p>
                <h className="topic-heading"></h>
                <h2 className="topic">Published</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-container">
        {videoData.map((videoUrl, index) => {
          const videoId = videoUrl.split('v=')[1]; // Extract video ID from URL
          return (
            <div key={index} className="video-box">
              <iframe
                width="300"
                height="105"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Dashboard
