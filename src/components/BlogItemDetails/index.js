// Write your JS code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'

class BlogItemDetails extends Component {
  state = {
    isLoading: true,
    blogItemData: {},
  }

  componentDidMount() {
    this.getBlogItemDetails()
  }

  getBlogItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      author: data.author,
      topic: data.topic,
      content: data.content,
    }
    this.setState({blogItemData: updatedData, isLoading: false})
  }

  render() {
    const {blogItemData} = this.state
    const {isLoading} = this.state
    return isLoading ? (
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    ) : (
      <div className="blog-item">
        <h1 className="title-name">{blogItemData.title}</h1>
        <div className="avatar-and-name">
          <img
            className="avatar"
            src={blogItemData.avatarUrl}
            alt={blogItemData.author}
          />
          <h1 className="author-name">{blogItemData.author}</h1>
        </div>
        <img
          height={350}
          width={720}
          src={blogItemData.imageUrl}
          alt={blogItemData.title}
        />
        <p>{blogItemData.content}</p>
      </div>
    )
  }
}

export default BlogItemDetails
