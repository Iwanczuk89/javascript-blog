'use strict';

{
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
}); */

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
  }

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
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = '5',
        optCloudClassPrefix = 'tag-size-',
        optAuthorListSelector = '.author.list';

    const generateTitleLinks = function (customSelector = '') {

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
            const linkHTMLData = {id: articleId, title: articleTitle};
            const linkHTML = templates.articleLink(linkHTMLData);
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

    const calculateTagsParams = function(tags) {
        const params = {max: 0, min: 999999 };
          
        for (let tag in tags) {
            console.log(tag + ' is used ' + tags[tag] + ' times');
             if  (tags[tag] > params.max) {
                params.max = tags[tag];
                }
            }

        for (let tag in tags) {
            if  (tags[tag] < params.min) {
                params.min = tags[tag];
                }
            }
        
        return params;
  };
    const calculateTagClass = function (count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    
        console.log('class number', classNumber);
        return optCloudClassPrefix + classNumber;
    };
    
    const generateTags = function(){

        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};
        
        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
        
        /* [DONE] START LOOP: for every article: */
        for (let article of articles){
            
            /* [DONE] find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleTagsSelector);
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
                //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                //console.log(linkHTML);
                const linkHTMLData = {
                    id: tag,
                    title: tag
                };
                const linkHTML = templates.articleTag(linkHTMLData);

                /* add generated code to html variable */
                html = html + linkHTML + '  ';
                console.log(html);

                /* [NEW] check if this link is NOT already in allTags */
                if(!allTags[tag]) {
        
                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
                } else {
                    allTags [tag]++;
                }
                        
                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;
            
            /* END LOOP: for every article: */
        }
            /* [NEW] find list of tags in right column */
            const tagList = document.querySelector('.tags');

           /* [NEW] create variable for all links HTML code */
           const tagsParams = calculateTagsParams(allTags);
           console.log('tagsParams:', tagsParams);

            //let allTagsHTML = '';
            const allTagsData = {
                tags: []
            };

            /* [NEW] START LOOP: for each tag in allTags: */
            for(let tag in allTags){
            
                /* [NEW] generate code of a link and add it to allTagsHTML */
                //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '">' + tag + '</a></li>';
                //console.log('tagLinkHTML:', tagLinkHTML);

                //allTagsHTML += tagLinkHTML;
                allTagsData.tags.push({
                    tag: tag,
                    count: allTags[tag],
                    className: calculateTagClass(allTags[tag], tagsParams)
                  });
                        /* [NEW] END LOOP: for each tag in allTags: */
                    }
            /*[NEW] add HTML from allTagsHTML to tagList */
            tagList.innerHTML = templates.tagCloudLink(allTagsData);
            console.log('allTagsData');
};

generateTags();

    const tagClickHandler = function (event) {
        
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
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        console.log(activeTagLinks);
        
        /* [DONE] START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {
            
            /* [DONE] remove class active */
            activeTagLink.classList.remove('active');

        /* [DONE] END LOOP: for each active tag link */
        }
        /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
        const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log(hrefTagLinks);
        
        /* [DONE] START LOOP: for each found tag link */
        for (let hrefTagLink of hrefTagLinks) {
            
            /* [DONE] add class active */
            hrefTagLink.classList.add('active');
            console.log(hrefTagLink);

        /* [DONE] END LOOP: for each found tag link */
        }

        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
};

  
    const addClickListenersToTags = function() {
        
        /* [DONE] find all links to tags */
        const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
        console.log(tagLinks);
        
        /* [DONE] START LOOP: for each link */
        for ( let tagLink of tagLinks) {
            
            /* [DONE] add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        
            /* [DONE] END LOOP: for each link */
        }
    };
  
    addClickListenersToTags();

    const generateAuthors = function() {
        
        /* [NEW] create a new variable allAuthors with an empty object */
        let allAuthors = {};

        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
    
        /* [DONE] START LOOP: for every article: */
         for(let article of articles) {

            /* [DONE] find authors wrappers */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
            console.log(authorWrapper);

            /* [DONE] /* make html variable with empty string */
            let html = '';
        
            /* get author from data-author attribute */
            const author = article.getAttribute('data-author');
            console.log(author);

            /* [DONE] generate HTML of the link */
            const linkHTMLData = {
                id: author,
                title: author
            };
            const linkHTMLAuthor = templates.articleAuthor(linkHTMLData);
            console.log(linkHTMLAuthor);

            /* [DONE] add generated code to html variable */
            html = html + linkHTMLAuthor;
            console.log(html);
            /* [NEW] check if this link is NOT already in allAuthors */
            if (!allAuthors[author]) {
            /* [NEW] add generated code to allTags array */
            allAuthors[author] = 1;
            } else {
            allAuthors[author]++;
        }
            /* [DONE] insert HTML of all the links into the tags wrapper */
            authorWrapper.innerHTML = html;
        
            /* END LOOP: for every article: */
        }
        /* [NEW] find list of authors in right column */
        const authorList = document.querySelector('.authors');
        
        /* [NEW] create variable for all links HTML code */
        const allAuthorData = {
            authors: []
        };

        /* [NEW] START LOOP: for each tag in allTags: */
        for (let author in allAuthors) {
           
            /* [NEW] generate code of a link and add it to allTagsHTML */
            //const linkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li>';

            //allAuthorsHTML += linkHTML;
            allAuthorData.authors.push({
                author: author,
                count: allAuthors[author],
              });
        
        /* [NEW] END LOOP: for each tag in allTags: */
        }
        
        /*[NEW] add HTML from allTagsHTML to tagList */
        authorList.innerHTML = templates.authorLink(allAuthorData);
    }

generateAuthors();

    const authorClickHandler = function (event) {
        
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
                activeAuthorLink.classList.remove('active');
    
                /* [DONE] END LOOP: for each active tag link */
            }
            /* [DONE] find all author links with "href" attribute equal to the "href" constant */
            const authorAttributeLinks = document.querySelectorAll('a[href="' + href + '"]');
            console.log(authorAttributeLinks);
            
            /* [DONE] START LOOP: for each found tag link */
            for (let authorAttributeLink of authorAttributeLinks) {
                
                /* [DONE] add class active */
                authorAttributeLink.classList.add('active');
                console.log(authorAttributeLink);
    
                /* [DONE] END LOOP: for each found tag link */
            }
    
            /* [DONE] execute function "generateTitleLinks" with article selector as argument */
            generateTitleLinks('[data-author="' + author + '"]');
    }
    const addClickListenersToAuthors = function() {
        
        
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
}
    
    
    




