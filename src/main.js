define(function(require) {
   'use strict';

   var
      Component      = require('Component'),
      requester      = require('requester'),
      router         = require('router'),
      app            = require('app'),
      mainTemplate   = require('/template/main');

   return Component.extend({

      template: mainTemplate,

      events: {
         dom: {
            'submit form': 'handleSearch'
         },
         router: {
            'query:changed:query': 'getEntries'
         },
         self: {
            'state:changed': 'render'
         }
      },

      getEntries: function(options) {
         var query = options.queryParams.query;

         if (!query) {
            this.setState({
               entries: [],
               query: ''
            });

            return;
         }

         requester.doGet({
            url: options.url,
            context: this
         }).done(function(response) {
            this.setState({
               entries: response.entries,
               query: query
            });
         });
      },

      handleSearch: function(e) {
         e.preventDefault();

         router.navigate(e.currentTarget.action, {
            queryParams: {
               query: this.$('input[name=query]').val()
            }
         });
      }
   });
});