/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"XLW5b9gBmQ8GXr2t","label":"reddit","bookmarks":[{"id":"MbzXZecD3ZUyUfF6","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"vJQHaDm7DHKV9Msl","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"1bMJ7fd2mBnVaBnM","label":"design tools","bookmarks":[{"id":"pKNa7ruvmmaabiHN","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"},{"id":"AvA5fFud0wmYC0iD","label":"Canva","url":"https://www.canva.com/"}]},{"id":"Ny8P3kWq95tjMics","label":"worth reading","bookmarks":[{"id":"W2ElP05bgeBDC5BQ","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"zVck5CzV8OqhOhVb","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"},{"id":"MqUavGpcl9cZe4oa","label":"DevDocs","url":"https://devdocs.io/"}]},{"id":"nyQFXnaU9Y9HMslc","label":"Dev Sites","bookmarks":[{"id":"GTF0mVLENMZXapkv","label":"Portfolio","url":"https://gnovaes-portfolio.vercel.app/"},{"id":"06LQILHhT2QH7SfG","label":"GitHub","url":"https://github.com/Guilherme-RNovaes"},{"id":"ZZndTvVAXiKgQpgH","label":"LinkedIn","url":"https://www.linkedin.com/in/guilherme-r-novaes/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
