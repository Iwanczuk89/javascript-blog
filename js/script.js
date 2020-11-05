
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
}); */

const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
   
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

};
  
    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';

    function generateTitleLinks(customSelector = '') {

        /* [DONE] remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        console.log(titleList);

        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        console.log(articles);
        
        let html ='';
        
        for (let article of articles){

            /* [DONE] get the article id */
            const articleId = article.getAttribute('id');
            console.log(articleId);

            /* [DONE] find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);
    
            /* get the title from the title element */

            /* [DONE] create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);
            
            /* [DONE] insert link into variable */
            html = html + linkHTML;
            console.log(html);
        }
        
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        console.log(links);
        
        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
    }
generateTitleLinks();

    function generateTags(){
        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
        
        /* [DONE] START LOOP: for every article: */
        for (let article of articles){
            
            /* [DONE] find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleSelector);
            console.log(tagsWrapper);
            
            /* [DONE] make html variable with empty string */
            let html = '';
            
            /* [DONE] get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            console.log(articleTags);
            
            /* [DONE] split tags into array */
            const articleTagsArray = articleTags.split(' ');
            console.log(articleTagsArray);

            /* START LOOP: for each tag */
            for(let tag of articleTagsArray){
                console.log(tag)
                
                /* generate HTML of the link */
                const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                console.log(tagHTML);

                /* add generated code to html variable */
                html = html + tagHTML + '  ';
                console.log(html);
            /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;
            /* END LOOP: for every article: */
        }
    };
generateTags();

    function tagClickHandler(event){
        
        /* [DONE] prevent default action for this event */
        event.preventDefault();

        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        console.log('link was clicked');
        
        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log(href);
        
        /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        console.log(tag);
        
        /* [DONE] find all tag links with class active */
        const activeTagsLinks = document.querySelectorAll('a.active[href="tag-"]');
        console.log(activeTagsLinks);
        
        /* [DONE] START LOOP: for each active tag link */
        for (let activeTagLInk of activeTagLinks) {
            
            /* [DONE] remove class active */
            activeTagsLink.classList.remove('active');

        /* [DONE] END LOOP: for each active tag link */
        }
        /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
        const attributeLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log(attributeLinks);
        
        /* [DONE] START LOOP: for each found tag link */
        for (let attributeLink of attributeLinks) {
            
            /* [DONE] add class active */
            attributeLink.classList.add('active');
            console.log(attributeLink);

        /* [DONE] END LOOP: for each found tag link */
        }

        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
};

  
    function addClickListenersToTags() {
        
        /* [DONE] find all links to tags */
        const tagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        console.log(tagsLinks);
        
        /* [DONE] START LOOP: for each link */
        for ( let tagsLink of tagsLinks) {
            
            /* [DONE] add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        
            /* [DONE] END LOOP: for each link */
        }
  }
  
  addClickListenersToTags();

    function generateAuthors() {
      
        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
    
        /* [DONE] START LOOP: for every article: */
         for(let article of articles) {

            /* [DONE] find tags wrappers */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
            console.log(authorWrapper);

            /* [DONE] /* make html variable with empty string */
            let html = '';
        
            /* get tags from data-tags attribute */
            const authorTags = article.getAttribute('data-author');
            console.log(authorTags);

            /* [DONE] generate HTML of the link */
            const authorHTML = '<a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>';
            console.log(authorHTML);

            /* [DONE] add generated code to html variable */
            html = html + authorHTML;
            console.log(html);

            /* [DONE] insert HTML of all the links into the tags wrapper */
            authorWrapper.innerHTML = html;
        
            /* END LOOP: for every article: */
        }
}
generateAuthors();

    function authorClickHandler(event) {
        
            /* [DONE] prevent default action for this event */
            event.preventDefault();
    
            /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
            const clickedElement = this;
            console.log('link was clicked');
            
            /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
            const href = clickedElement.getAttribute('href');
            console.log(href);
            
            /* [DONE] make a new constant "author" and extract tag from the "href" constant */
            const author = href.replace('#author-', '');
            console.log(author);
            
            /* [DONE] find all author links with class active */
            const activeAuthorLinks = document.querySelectorAll('a.active[href="#author-"]');
            console.log(activeAuthorLinks);
            
            /* [DONE] START LOOP: for each active tag link */
            for (let activeAuthorLink of activeAuthorLinks) {
                
                /* [DONE] remove class active */
                activeAuthorLinks.classList.remove('active');
    
                /* [DONE] END LOOP: for each active tag link */
            }
            /* [DONE] find all author links with "href" attribute equal to the "href" constant */
            const authorAttributeLinks = document.querySelectorAll('a[href="' + href + '"]');
            console.log(authorAttributeLinks);
            
            /* [DONE] START LOOP: for each found tag link */
            for (let authorAttributeLink of autorAttributeLinks) {
                
                /* [DONE] add class active */
                autorAttributeLink.classList.add('active');
                console.log(attributeLink);
    
                /* [DONE] END LOOP: for each found tag link */
            }
    
            /* [DONE] execute function "generateTitleLinks" with article selector as argument */
            generateTitleLinks('[data-author="' + author + '"]');
    }
    function addClickListenersToAuthors() {
        
        
            /* [DONE] find all links to authors */
            const authorLinks = document.querySelectorAll('a[href^="#author-"]');
            console.log(authorLinks);
            
            /* [DONE] START LOOP: for each link */
            for ( let authorLink of authorLinks) {
                
                /* [DONE] add authorClickHandler as event listener for that link */
                authorLink.addEventListener('click', authorClickHandler);
            
                /* [DONE] END LOOP: for each link */
            }
      }
      
      addClickListenersToAuthors();
    
    
    




