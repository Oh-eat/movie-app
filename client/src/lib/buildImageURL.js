import { IMAGE_BASE_URL } from "../components/Config";

export default function buildImageURL(path, size = "w500") {
  return path
    ? `${IMAGE_BASE_URL}/${size}${path}`
    : "https://dalk4zrp4jp3q.cloudfront.net/images/mac_YFVkNF/movie_placeholder_big_2x.png";
}
