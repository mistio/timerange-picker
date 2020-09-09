// TODO get the code below using yarn / npm from https://github.com/cmaurer/relative.time.parser

/* (The MIT License)

    Copyright (c) 2015 Christian Maurer

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//(function() {

var relativeTimeRe = /([-+])(\d*)(minutes|minute|min|hours|hour|days|day|weeks|week|months|month|mon|years|year|Quarters|Quarter|seconds|second|sec|s|m|h|d|M|y|Y|Q|ms|w)/,
unitConverter = function(unit){
    switch(unit){
        case 'ms':
            return 'milliseconds';
        case 's':
            return 'seconds';
        case 'sec':
            return 'seconds';
        case 'second':
            return 'seconds';
        case 'seconds':
            return 'seconds';
        case 'min':
            return 'minutes';
        case 'm':
            return 'minutes';
        case 'minute':
            return 'minutes';
        case 'minutes':
            return 'minutes';
        case 'hour':
            return 'hours';
        case 'hours':
            return 'hours';
        case 'h':
            return 'hours';
        case 'day':
            return 'days';
        case 'days':
            return 'days';
        case 'd':
            return 'days';
        case 'w':
            return 'weeks';
        case 'week':
            return 'weeks';
        case 'weeks':
            return 'weeks';
        case 'mon':
            return 'months';
        case 'month':
            return 'months';
        case 'months':
            return 'months';
        case 'M':
            return 'months';
        case 'y':
            return 'years';
        case 'Y':
            return 'years';
        case 'year':
            return 'years';
        case 'years':
            return 'years';
        case 'Q':
            return 'quarters';
        case 'Quarter':
            return 'quarters';
        case 'Quarters':
            return 'quarters';
        default:
            return null;
    }

}, initializeMomentRelative;

initializeMomentRelative = function(moment) {
    moment.fn.relativeTime = function (relativeTimeString) {
        if (relativeTimeString.trim() === 'now') {
            return moment();
        } else {
            if (relativeTimeRe.test(relativeTimeString.trim())) {
                var result = relativeTimeRe.exec(relativeTimeString),
                    amount = result[2],
                    unit = unitConverter(result[3]);
                if (unit === null) {
                    return null;
                }
                if (result[1] === '-') {
                    return moment().subtract(+amount, unit);
                } else {
                    return moment().add(+amount, unit);
                }
            } else {
                return null;
            }
        }
    };
    moment.fn.isRelativeTimeFormat = function(relativeTimeString){
        if (relativeTimeString.trim() === 'now') {
            return true;
        }
        return relativeTimeRe.test(relativeTimeString);
    };
    return moment;
};
//}).call(this);
/**
@demo demo/index.html
@hero hero.svg
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import "@polymer/paper-styles/paper-styles.js"
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js"
import "@polymer/paper-button/paper-button.js"
import "@polymer/paper-icon-button/paper-icon-button.js"
import "@polymer/paper-input/paper-input.js"
import "@polymer/paper-card/paper-card.js"
import "@polymer/paper-dialog/paper-dialog.js"
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js"
import "@polymer/paper-listbox/paper-listbox.js"
import "@polymer/paper-item/paper-item.js"
import "@polymer/iron-icons/iron-icons.js"
import "@polymer/iron-icons/editor-icons.js"
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import moment from "moment/src/moment.js";

Polymer({
  _template: html`
        <style>
             :host {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                justify-content: center;
                margin-bottom: 4px;
            }

            .flex, .layout.horizontal {
                display: flex;
                flex-direction: row;
            }

            paper-button#currentTimeRangeButton {
                text-transform: none;
            }

            paper-icon-button {
                padding: 0.7em 0.57em;
            }

            paper-icon-button[disabled] {
                opacity: 0.32;
            }

            paper-button[disabled] {
                background-color: #ccc !important;
            }

            .time-input paper-icon-button {
                align-self: flex-end;
            }

            .time-input {
                vertical-align: baseline;
            }

            .buttons {
                justify-content: flex-end;
            }

            #timerange {
                margin-right: 16px;
            }

            #quickrange {
                margin: 0 16px 32px 16px;
            }

            paper-dialog h3 {
                margin-top: 0;
                margin-bottom: 0;
            }

            hr {
                margin: 0;
                opacity: 0.54;
            }

            paper-item {
                padding: 4px;
                font-size: 14px;
                min-height: auto;
                cursor: pointer;
            }

            paper-icon-button,
            paper-icon-button {
                display: block;
            }

            .pick-buttons {
                display: flex;
                justify-content: flex-end;
            }

        </style>

        <paper-icon-button on-tap="moveTimeRangeBack" icon="icons:chevron-left"></paper-icon-button>
        <paper-button id="currentTimeRangeButton" toggles="" active="{{isMainDialogOpen}}">[[durationText]]</paper-button>
        <paper-icon-button id="plusButton" disabled\$="[[!_isFwdAllowed(to)]]" on-tap="moveTimeRangeFwd" icon="icons:chevron-right"></paper-icon-button>

        <paper-dialog opened="{{isMainDialogOpen}}" id="dialog" modal="" class="paper-time-picker-dialog">
            <div class="layout horizontal">
                <div id="timerange">
                    <h3>Time Range</h3>
                    <div class="layout horizontal time-input">
                        <paper-input class="flex" id="to" label="From [[_computeText(selectedFrom)]]" value="{{selectedFrom}}"></paper-input>
                        <paper-icon-button class="from" toggles="" active="{{isFromDialogOpen}}" icon="editor:insert-invitation"></paper-icon-button>
                    </div>
                    <div class="layout horizontal time-input">
                        <paper-input class="flex" id="to" label="To [[_computeText(selectedTo)]]" value="{{selectedTo}}"></paper-input>
                        <paper-icon-button class="to" toggles="" active="{{isToDialogOpen}}" icon="editor:insert-invitation"></paper-icon-button>
                    </div>
                    <paper-dropdown-menu id="refreshIntervalMenu" disabled\$="[[!_isRefreshAllowed(selectedTo)]]" label="refresh" placeholder="off">
                        <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{selectedRefreshInterval}}" attr-for-selected="data-value">
                            <paper-item data-value="0">off</paper-item>
                            <paper-item data-value="10000">every 10sec</paper-item>
                            <paper-item data-value="60000">every 1min</paper-item>
                            <paper-item data-value="600000">every 10min</paper-item>
                        </paper-listbox>
                    </paper-dropdown-menu>
                </div>
                <div id="quickrange">
                    <h3>Quick Ranges</h3>
                    <div id="listbox" role="listbox">
                        <template is="dom-repeat" items="[[quickRanges]]" as="item">
                            <paper-item id="range" class\$="range-button" from\$="[[item.from]]" to\$="[[item.to]]" type\$="[[item.type]]" on-tap="selectQuickRange">[[item.text]]</paper-item>
                        </template>
                    </div>
                </div>
            </div>
            <hr>
            <div class="layout horizontal buttons">
                <paper-button dialog-dismiss="">Cancel</paper-button>
                <paper-button dialog-confirm="" on-tap="applyRange">Apply</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog id="datetime" opened="{{isFromDialogOpen}}">
            <h2>Select start of time range</h2>
            <paper-input id="datetimeFrom" type="datetime-local" label="[[_computeText(temporaryFrom)]]" value="{{temporaryFrom}}" max="[[_getNow()]]" auto-validate=""></paper-input>
            <div class="pick-buttons">
                <paper-button dialog-dismiss="">Cancel</paper-button>
                <paper-button dialog-confirm="" on-tap="applyFrom" disabled="[[!_isValid(temporaryFrom)]]">Apply</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog id="datetime" opened="{{isToDialogOpen}}">
            <h2>Select end of time range</h2>
            <paper-input id="datetimeTo" type="datetime-local" label="[[_computeText(temporaryTo)]]" value="{{temporaryTo}}" max="[[_getNow()]]" auto-validate=""></paper-input>
            <div class="pick-buttons">
                <paper-button dialog-dismiss="">Cancel</paper-button>
                <paper-button dialog-confirm="" on-tap="applyTo" disabled="[[!_isValid(temporaryTo)]]">Apply</paper-button>
            </div>
        </paper-dialog>
`,

  is: 'timerange-picker',

  properties: {
      from: {
          type: String,
          notify: true,
          value: '',
          observer: '_fromUpdated'
      },
      to: {
          type: String,
          notify: true,
          value: '',
          observer: '_toUpdated'
      },
      refreshInterval: {
          type: Number,
          notify: true,
          value: 0,
          observer: '_refreshIntervalUpdated'
      },
      selectedFrom: {
          type: String,
      },
      selectedTo: {
          type: String,
      },
      temporaryFrom: {
          type: String,
      },
      temporaryTo: {
          type: String,
      },
      selectedRefreshInterval: {
          type: Number,
          value: 0
      },
      durationText: {
          type: String,
          computed: '_computeDurationText(from, to)'
      },
      timeRangeDurationInMinutes: {
          type: Number,
          notify: true,
          computed: '_computetimeRangeDurationInMinutes(from, to)'
      },
      isMainDialogOpen: {
          type: Boolean
      },
      isFromDialogOpen:  {
          type: Boolean
      },
      isToDialogOpen:  {
          type: Boolean
      },
      quickRanges: {
          type: Array,
          value: function() {
              return [{
                  from: 10,
                  to: "now",
                  type: "minutes",
                  text: "Last 10 minutes",
                  refreshInterval: 10000
              }, {
                  from: 1,
                  to: "now",
                  type: "hour",
                  text: "Last 1 hour",
                  refreshInterval: 60000
              }, {
                  from: 6,
                  to: "now",
                  type: "hours",
                  text: "Last 6 hours",
                  refreshInterval: 600000
              }, {
                  from: 7,
                  to: "now",
                  type: "days",
                  text: "Last 7 days",
                  refreshInterval: 600000
              }, {
                  from: 30,
                  to: "now",
                  type: "days",
                  text: "Last 30 days",
                  refreshInterval: 600000
              }, {
                  from: 1,
                  to: "now",
                  type: "year",
                  text: "Last 1 year",
                  refreshInterval: 600000
              }];
          }
      }
  },

  observers: [
      '_isFromDialogOpenChanged(isFromDialogOpen)',
      '_isToDialogOpenChanged(isToDialogOpen)'
  ],

  attached: function() {
      // `attached` fires once the element and its parents have been inserted
      // into a document.
      //
      // This is a good place to perform any work related to your element's
      // visual state or active behavior (measuring sizes, beginning animations,
      // loading resources, etc).
      let momnt = initializeMomentRelative(moment);
      console.debug('timerange-picker attached');
  },

  detached: function() {
      // The analog to `attached`, `detached` fires when the element has been
      // removed from a document.
      //
      // Use this to clean up anything you did in `attached`.
      console.debug('timerange-picker detached');
  },

  _getNow: function() {
      console.log('_getNow', moment().format('MM/DD/YYYYTHH:mm'));
      return moment().format('MM/DD/YYYYTHH:mm');
  },

  _computeText: function(date) {
      if (!date) {
          return 'Select a date.';
      } else if (typeof date == 'string' && (date.trim().startsWith('now') || date.trim().startsWith('-'))) {
          return moment.utc(date).local().relativeTime(date) && moment.utc(date).local().relativeTime(date).fromNow();
      } else if (!moment(date).isValid()) {
          return '';
      } else {
          return moment.utc(date).local().fromNow();
      }
  },

  _isFromDialogOpenChanged: function(isFromDialogOpen) {
      // console.log('isFromDialogOpen', isFromDialogOpen);
      if (isFromDialogOpen) { //opened dialog
          this.set('temporaryFrom', this.selectedFrom.slice(0));
      } 
  },

  _isToDialogOpenChanged: function(isToDialogOpen) {
      // console.log('isFromDialogOpen', isToDialogOpen);
      if (isToDialogOpen) { //opened dialog
          this.set('temporaryTo', this.selectedTo.slice(0));
      }
  },

  _isRefreshAllowed: function(selectedTo) {
      if (!selectedTo || (typeof selectedTo == "string" && selectedTo.indexOf('now') == -1)) {
          return false;
      } else {
          return true;
      }
  },

  _isFwdAllowed: function(to) {
      if (typeof to == "string" && to.startsWith("now")) {
          return false;
      }
      return true;
  },

  _fromUpdated: function() {
      if (typeof this.from == 'string' && (this.from.trim().startsWith('now') || this.from.trim().startsWith('-'))) {
          this.selectedFrom = this.from;
      } else
          this.selectedFrom = this._computeMoment(this.from).format('MM/DD/YYYY HH:mm');
  },

  _toUpdated: function() {
      if (typeof this.to == 'string' && (this.to.trim().startsWith('now') || this.to.trim().startsWith('-'))) {
          this.selectedTo = this.to;
      } else {
          this.selectedTo = this._computeMoment(this.to).format('MM/DD/YYYY HH:mm');
      }
  },

  _refreshIntervalUpdated: function() {
      this.selectedRefreshInterval = this.refreshInterval;
  },

  _computeDurationText: function(from, to) {
      if (!from) {
          return;
      }
      var momentFrom = this._computeMoment(from),
          momentTo;
      if (!to) {
          momentTo = this._computeMoment("now");
      } else {
          momentTo = this._computeMoment(to);
      }
      if (typeof this.to == "string" && this.to.trim().startsWith("now")){
          return ("Last " + momentFrom.fromNow(true)).replace(" an ", " ").replace(" a ", " ");
      }
      return momentFrom.format('MM/DD/YYYY HH:mm') + " - " + momentTo.format('MM/DD/YYYY HH:mm');
  },

  _computeMoment: function(m) {
      // relative dates start with now or -
      if (typeof m == 'string' && (m.trim().startsWith('now') || m.trim().startsWith('-'))) {
          return moment().relativeTime(m);
      } else {
          return typeof m == "number" ? moment(m*1000) : moment(m) ;
      }
  },

  _computetimeRangeDurationInMinutes: function(from, to){
      var momentFrom = this._computeMoment(from),
          momentTo = this._computeMoment(to);
      return Math.round((momentTo-momentFrom)/60000);
  },

  applyFrom: function() {
      // console.log('applyFrom', this.temporaryFrom, moment(this.temporaryFrom).utc().format('MM/DD/YYYY HH:mm:ss'))
      this.set('selectedFrom', moment(this.temporaryFrom).utc().format('MM/DD/YYYY HH:mm:ss'));
  },

  applyTo: function() {
      // console.log('applyTo', this.temporaryTo, moment(this.temporaryTo).utc().format('MM/DD/YYYY HH:mm:ss'))
      this.set('selectedTo', moment(this.temporaryTo).utc().format('MM/DD/YYYY HH:mm:ss'));
  },

  selectQuickRange: function(e) {
      var el = e.target;
      var diff = 0;
      var from = e.model.item.from;
      var to = e.model.item.to;
      var val = e.model.item.type;

      var newDate = new Date();
      switch (val) {
          case "days":
              this.selectedFrom = -from + "d";
              break;
          case "hour":
          case "hours":
              this.selectedFrom = -from + "h";
              break;
          case "year":
              this.selectedFrom = -from + "y";
              break;
          case "minutes":
              this.selectedFrom = -from + "min";
              break;
      }
      this.selectedRefreshInterval = Number(e.model.item.refreshInterval);
      this.selectedTo = "now";
  },

  moveTimeRangeBack: function() {
      var momentFrom = this._computeMoment(this.from),
          momentTo = this._computeMoment(this.to);
      // we're setting "to" to undefined to avoid triggering the observers until both "to" and "from" have final values
      // this.to = undefined;
      var newTo = moment(momentTo - this.timeRangeDurationInMinutes * 60000).unix();
      this.from = moment(momentFrom - this.timeRangeDurationInMinutes * 60000).unix();
      this.to = newTo;
  },

  moveTimeRangeFwd: function() {
      var momentFrom = this._computeMoment(this.from),
          momentTo = this._computeMoment(this.to);
      // we're setting "to" to undefined to avoid triggering the observers until both "to" and "from" have final values
      if (moment(momentTo + this.timeRangeDurationInMinutes * 60000) > moment()){
          // this.to = undefined;
          var newTo = 'now';
          this.from = moment(moment() - this.timeRangeDurationInMinutes * 60000).unix();
          this.to = newTo;
      } else {
          var newTo = moment(momentTo + this.timeRangeDurationInMinutes * 60000).unix();
          // this.to = undefined;
          this.from = moment(momentFrom + this.timeRangeDurationInMinutes * 60000).unix();
          this.to = newTo;
      }
  },

  applyRange: function() {
      if (this.selectedRefreshInterval != this.refreshInterval) {
          this.refreshInterval = Number(this.selectedRefreshInterval);
      }
      var from, to;
      if (typeof this.selectedTo === "number") {
          var df = new Date(this.selectedFrom);
          var dt = new Date(this.selectedTo);
          this.to = dt.getTime() / 1000;
          this.from = df.getTime() / 1000;
      } else {
          if (this.selectedTo.indexOf('/') > -1) {
              this.to = moment(this.selectedTo).unix();
          } else {
              this.to = this.selectedTo;
          }

          if (this.selectedFrom.indexOf('/') > -1) {
              this.from = moment(this.selectedFrom).unix();
          } else {
              this.from = this.selectedFrom;
          }
      }
  },

  _isValid: function(date) {
      // console.log('isValid', date, moment(date).isValid());
      return moment(date).isValid();
  }
});
