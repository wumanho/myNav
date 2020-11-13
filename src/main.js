let $lastLi = $(".lastLi")
/**
 * 每次加载网页时，从localstorage中加载用户之前保留的所有网址
 */
let userSite = localStorage.getItem("userSite")
let userSiteObject = JSON.parse(userSite)

/**
 * userSiteObject如果为空，初始化一下
 */
let hashMap = userSiteObject || [
    {logo: "A", logoType: "text", url: "https://www.acfun.cn",link:"acfun.cn"},
    {logo: "bilibili.png", logoType: "image", url: "https://bilibili.com",link:"bilibili.com"}
]

render()

/**
 * 渲染 hashmap 功能
 */
function render(){
    //清空 ul下面的所有li，除了最后一个li，因为最后一个li是添加按钮
    $(".siteList").find("li:not(.lastLi)").remove()
    hashMap.forEach(node=>{
        const $li = $(`<li>
            <a href=${node.url}>
                <div class="site">
                    <div class="logo">${node.logo[0].toUpperCase()}</div>
                    <div class="link">${node.link}</div>
                </div>
                </a>
    </li>`).insertBefore($lastLi)
    })
}

/**
 *  简化URL功能
 */
function simplifyUrl(url){
    return url.replace("https://","")
        .replace("http://","")
        .replace("www.","")
        .replace(/\/.*/,"")
}

/**
 * 添加网站功能
 */
$(".addButton")
    .on("click", () => {
        let newUrl = window.prompt("请输入网址")
        //如果不是以http开头，帮助用户添加前缀
        if (newUrl.indexOf("http") !== 0) {
            newUrl = "https://" + newUrl
        }
        hashMap.push({
            logo: newUrl[8].toUpperCase(),
            logoType: "text",
            url: newUrl,
            link: simplifyUrl(newUrl)
        })
        console.log(hashMap)
        render()
    })

/*
    当用户关闭，或跳转到其他网站时，保留用户所有网址到localstorage
 */
window.onbeforeunload = ()=>{
    let str = JSON.stringify(hashMap)
    //localStorage.clear()
    localStorage.setItem("userSite",str)
}
