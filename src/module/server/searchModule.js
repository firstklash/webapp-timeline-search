define(function(require) {
   'use strict';

   var
      searcherBuilder     = require('SearcherBuilder'),
      UGC_INDEX           = require('IndexUtil.IndexType.UGC'), 
      indexUtil           = require('IndexUtil'),
      userFactory         = require('UserFactory'),
      resourceLocatorUtil = require('ResourceLocatorUtil'),
      propertyUtil        = require('PropertyUtil');

   return {
      getEntries: function(query) {
         var entries = [],
            searchResult = searcherBuilder
               .setIndex(indexUtil.getDefaultIndex(UGC_INDEX))
               .build()
               .search(query + '*', 10);
         
         if (searchResult.hasHits()) {
            var hits = searchResult.getHits(), 
               hit;

            while (hits.hasNext()) {
               hit = hits.next();

               var authorId = hit.getField('author'),
                  author = resourceLocatorUtil.getNodeByIdentifier(authorId),
                  identityWrapper = userFactory.getUserIdentityWrapper(author),
                  profileImage = identityWrapper.getProfileImage();

               entries.push({
                  author: propertyUtil.getString(author, 'displayName'),
                  entryText: hit.getField('summary'),
                  profileImageUrl: propertyUtil.getString(profileImage, 'URI')
               });
            }
         }

         return entries;
      }
   };
});