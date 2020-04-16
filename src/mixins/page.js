export default {
  data () {
    return {
      page: null
    }
  },

  created () {
    // Transform route path to pageId for use with api
    const path = this.$route.path
    const pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1) || 'home'

    // Prevent `home` from being fetched twice
    if (pageId === 'home') {
      this.page = new Promise(resolve => resolve()).then(() => (this.page = this.$home))
    } else {
      this.page = this.$api.getPage(pageId).then(page => (this.page = page))
    }
  },

  async activated () {
    await this.page

    const pageTitle = !this.isHomePage ? `${this.page.title} – ${this.$site.title}` : this.$site.title
    document.title = pageTitle

    // Set route announcement
    this.$announcer.set(`Current page: ${this.page.title}`)

    this.$emit('route-changed')
  }
}
