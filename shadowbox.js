var shadowBox = function () {
  "use strict";
  var overlay = '#sb_overlay',
    loader = '#sb_loader',
    content = '#sb_content',
    sb_html = '.sb_html',
    content_img = '.sb_content_img',
    controls = '#sb_controls',
    prev_btn = '#sb_prev',
    next_btn = '#sb_next',
    sb_title = '#sb_title',
    close_btn = '#sb_close',
    vp_width = parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 0),
    vp_height = parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 0),
    html_str = '<span id="sb_prev"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAADZUlEQVRYR9WZbW7aQBCGZ0AgRcLrHIEblJygcIK2JwicoNwgcIL0BiEnKD1B4ARJTpDeoNk1CAmEpxprjYxje3f9IVr/QvLu7LPD7Mw7a4SKj1LqCyIOiGhIRNf8O2mSiF4Q8R0RVwCw8jxvXWVJLDM5CAKGuwWAcZn5ALBAxEfP83gTTo8TsFLqKxHdI2LfaZWcwdr7cyHE0taeFfBut+sfDocHABjaGnYct+p0OpOrq6vfpnlGYO3VB0S8Nhmr8p6IOM4nJm8XAgdBcEdEsyogrnMRceZ53jxvXi6wUopDoOyhcuVMj18IISZZRjKBpZQzRLyrumqV+UQ0933/w7/7AZhjFgB+Vlmsxrnf0jF9BszZYL/fPzd9wGw3xAex2+3eJLPHGbBS6qls6iIiiYhTz/OW2+22T0RjIvpuC1cwbiWEGMXvT8BVQoFh2+32sNfrvSQXDoLgR03Qp9A4AUsp38pUsDxYBt9sNoMwDJ+repkrou/7N2wnAtbagMPB6SmCZUO6Qr45Gc0ZjIgj1h4RsFJqAQAsZqwfEywbklJOEfHe2mjxwEchxDgGJhejNrAcDsfj8anOjCOEQHQ9bJeCjeIXcYQuVe2SsAzM1Y89zCL6sykkbGC54wiCgM+Di7Izrp1gW7OHubKdtTVpeBtY04aL3nOWCsNwiYh+0bhI8CulbA7ch5peBTBrrm1qtQLm01k3YJY9KSWL+EIv/2vAf0xp0Ao4rjJNetklJFiwfDIE+3u73R6lxU1dG3DoG19d0poROpHWCuMwtVGXTjxKa9btEAtqk6d1SV6ZDk+ZfycqHLaxEy9wSeioNGu1ZpOLT065FHQkfirIS2N4NCYvXcPCNjwaE/Day8b0lnVQisKjrhYJAF6FEJHeqasJzQyPRptQ7WUrqZnnad3m/9Jt/i0RTcukr9SctRDilKuzLlL4xtwl8dfAlG2CZW232x3kXqRoL/8/V1XxPl2qX1Putb4MjAHKtP41wkctfZa9QmF+CU/neTaGN3YSWvrxV59GD6K+TBxX+mQQ70pXLO6GXTpclwhZdzqdcS0fZZKr6ksXvhUvFPwOpK8AMDN5NWnPGBJZi2vtwYfC6T4uYesREReNf1jMgw/DcIiIXI34AiXtffbiOxGtWq0Wf7p1/vqZXPcvOX1C67/2eAoAAAAASUVORK5CYII=" alt="Menu Principal" title="Menu Principal" /></span><span id="sb_next"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAADbUlEQVRYR9VZ/03bQBR+z5EjIbg7ugGdoDBBwwTABA0btBMQJiidgGSCdgOSCQoTlBHwGQkJBK961jmYxI7f3dlF9V8I7u599/G9n4cQ+VlrjxBxn4hGRLTLP1ePJKJrRLxDxDkAzJVSixiTGLI5z3MG9wUAxiH7AWCKiDOlFF/C6/MCbK09JqLviLjnZaVhsWP/XGv9S3qeCPDDw8Pe09PTJQCMpAd7rpunaXq6tbV127avFbBj9RIRd9sOi/k7EbHOT9vY3gg4z/MzIprEAPHdi4gTpdR5075GwNZalkCoU/niXF0/1Vqf1h1SCzjLsgkinsVajdlPROfGmLX/7hpg1iwA/Iwx1uHek1VNvwHM0eDx8fF33w4mvRA74nA4PKhGjzeArbVXXYQuRPyBiNPt7e3bPM85dl8gopECXVk311oflr9bAu5KCgxWKfW1avT+/n7/+fl5HgF6KY0l4CzL/nSRwZIkOdjZ2bleZTMGNGdEY8wBn1kAdrUByyH6S9P0Y1PGigGNiIdcexSArbVTAOBiJvojom/GmIumgyJAz7TW4xIwRSN1B7BnDwaDwzpZlDZCQWutEbtytuqF+wLNssC+slofoDn7McNcRH/2kIRPx3CnlBpzx9GRphfMMGe2N23N6uFElCVJchzSIUiIkGq6KPitta0OV4YUifHQNVJfagXM7Bpjei3ey0uKyGtbxM5jjPkQypzPvjYsRaYTLXJZxse471pptmXAnPc/bTLALCdJctKz010JytqbkLDmM0vIhGFNApY5LcJaL+0QO+tgMBgJUrQULBSJQ6odH032AbZwOE7NrlprjcVSwH2BZftF8fNO5aVYBhWiXsvLLmUhKOBDwBZyWBbwjuXW8CaRRUuLFAQWAG601kW98y+b0FCwjHO9CXUs+5aataQjIrf1M9fmH7k2P7QeWWitl1PTukEKT8xDZwgS1YjXcMQZDof7jYMUx/L/M6oqr95X9hNTC1BkNdEwsFKbdtb6+wB1a4uYW7dv40D7PZhuYrYEL30y4FefXh2RHQwRx1FPBuWt3KMMS8Snu/ZRwiJN03EnjzJVq65R5Kn4xoLfA+kNAEzaWK2e1yqJOuOu9mCnCJ3HzXh+HNLBBAGuXoLBv7y8jBCRsxFns1X2mcU7IponScJPtz4dyxpffwGQSCPryHYV6gAAAABJRU5ErkJggg==" alt="Menu Principal" title="Menu Principal" /></span> <div id="sb_overlay"></div><div id="sb_loader"></div><div id="sb_content"></div><div id="sb_controls"><span id="sb_title"></span>  <span id="sb_close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAADb0lEQVRYR9WZ3VHjMBDHd5mxZ3iwRAcHFRxUcFDBQQUXKiGp4EogqQA6uKSCIxXAdYDlB2bCDHuzHtkIR45WsjN3+Ikhkvbnv/dLEsLAxxjzHRFPieiciI74b3dJInpAxGdEXALAsiiK1RCTmDK5qiqG+wEAk5T5ADBHxEVRFPwSUU8UsDHmkoh+IuJxlJWewVb9mVLqXrqeCPjl5eX49fX1FgDOpQtHjltmWXZ9eHj4FJoXBLaq3iLiUWixIb8TEfv5dUjtncBVVd0Q0XQISOxcRJwWRTHrm9cLbIxhF0gNqljO7vi5Uurat4gXuCzLKSLeDLU6ZD4RzbTWW193C5h9FgDuhhgbce5V16c/AHM22Gw2v/cdYNIX4kDM8/zMzR4fgI0xv/aYuqSc3XFLpdRF888W+D9zhS506xotcFmWjzEVjIj+IOKXFNli53JF1Fqfsa0a2PYG7A7Sp35jWwG5rH4VTlxnWXbJPhn7RRHxgnuPGtgYMwcAbmaCD6ujtW57Ce7QqqriJiYEvS6K4pw7t8ZIWZZPEV9poZSaNMAUJHUGZFl24kauAHoL1n6dxxi7SinE2E/DBtinOHJdtXZAb8HyWM5I3d45BM9ugalVTQg9GqwVasYKs/99C72d7/cANHR9NlVZx/aKFebK9mFbEwPfB12nICfARoCtXZEVjgo4qdLuuDFg20o3BnBfINr/JwVY31ceRWG7+FaANcDCPC3yxLGAvbANgSBPi2DruDDGPAiq1K4FvanLF3QjKL0elNYAoDfPMnBEcZEqXKe11O1QsCgIi4sUltPaDBM6NTYQhHX8N6aM74SvSzOPiE1tvuZnV2/gUzq5+bHAMe3lk9b6xM0AkkbGBx25aXhvLxPcom3gN5vNnbS0M3Se51eDG3irclR6IyJuvpMOBRPmrpVSdb/zeTehVuXkVlOcm+IHrpRS7amp7yCFT8x1/LrjzyCiMs/z096DFKvy5zmqajQaUP1Gk1l8GNhYjNn6j0b5vlCdc33r7jzQ/hdK9ynbwEuvDPjWZ6+ByAGGiJNBVwbNW9m6z+U7aXctcJlVlmWTUS5lXGP20IVPxUPHUgLGesgaAKYhVd3Fgi7hs2x7Dw4K0XmcZ40FIs73frHYB//29saHfFyN+Gqsqz6r+ExEy4ODA766jb79dO3+BVXqc+ulHktxAAAAAElFTkSuQmCC" alt="Menu Principal" title="Menu Principal" /></span></div>',
    writeStruct = function () {
      var style = document.createElement('style');
      style.innerHTML = '#sb_loader{position:fixed;z-index:99999999;left:0;top:0;background:url(data:image/gif;base64,R0lGODlhFAAUALMIAIeHhz8/P1dXVycnJ8/Pz7e3t5+fn29vb////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAIACwAAAAAFAAUAAAEUxDJSau9iBDMteZTUUjehgzDJYqkiaLWOlZvGs8WDO6UYfCBwMTnAwWDEuKPcxQml0YnjwcAYASCS7VqwWItWyvicJB4s2AxmWxGg9bl6YQtl0cAACH5BAUHAAgALAEAAQASABIAAAROEMkpS6E4W5upMdUmEQT2feFIltMJYivbvhnZ3R0A4NMwIDodz+cL7nDEn5CH8DGZh8MtEMBEoxkqlXKVIgQCibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpjaE4W5spANUmFQX2feFIltMJYivbvhnZ3d1x4BNBIDodz+cL7nDEn5CH8DGZAsFtMMBEoxkqlXKVIgIBibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpAaA4W5vpOdUmGQb2feFIltMJYivbvhnZ3Z0g4FNRIDodz+cL7nDEn5CH8DGZgcCNQMBEoxkqlXKVIgYDibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpz6E4W5upENUmAQD2feFIltMJYivbvhnZ3V0Q4JNhIDodz+cL7nDEn5CH8DGZg8GtUMBEoxkqlXKVIggEibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkphaA4W5tpCNUmHQf2feFIltMJYivbvhnZ3d0w4BMAIDodz+cL7nDEn5CH8DGZBMLNYMBEoxkqlXKVIgoFibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpQ6A4W5vpGNUmCQL2feFIltMJYivbvhnZ3R1B4NNxIDodz+cL7nDEn5CH8DGZhcINAMBEoxkqlXKVIgwGibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAARFEMkpx6A4W5spIdUmBQH2feFIltMJYivbvhnZ3V1R4JMgIDodz+cL7nDEn5CH8DGZBsNzEo1OEVUpAgCAarncK7grJmciADs=) center center no-repeat;display:none;} #sb_overlay{position:fixed;background-color:rgba(0, 0, 0, 0.85);z-index:9999999;left:0;top:0;display:none;} #sb_content{position:absolute;transition:all 500ms;height:auto!important;z-index:99999999;overflow:auto;text-align:center;transition:all 250ms;opacity:0;display:none;padding:6px 6px 0 6px;} #sb_controls{position:fixed;float:left;width:100%;z-index:99999999999;overflow:hidden;display:none;background-color:#000;background-color:rgba(0,0,0,.5);} .sb_html{display:none;} #sb_prev{transition:all 500ms;position:fixed;z-index:99999999999;left:10%;top:50%;color:#FFF;cursor:pointer;opacity:0.5;} #sb_next{transition:all 500ms;position:fixed;z-index:99999999999;right:8.5%;top:50%;color:#FFF;cursor:pointer;opacity:0.5;} #sb_next,#sb_prev{display:none;} #sb_close{float:right;margin-right:15px;margin-top:17px;cursor:pointer;opacity:0.5;} #sb_close:hover,#sb_next:hover,#sb_prev:hover{transition:all 500ms;opacity:1;} #sb_title{float:left;margin-left:25px;margin-top:25px;font-size:20px;color:#FFF;} #sb_title a{color:#AAA;cursor:pointer;} #sb_title a:hover{text-decoration:underline;} .shadowbox-open-original{font-size:16px;margin-top:17px;margin-right:20px;color:#EEE;}';
      document.head.appendChild(style);
      $('body').prepend(html_str);
      $(controls).css({
        'height': function () {
          if (vp_width > 500) {
            return '80px';
          }
          return 'auto';
        }()
      });
    },
    setOverlay = function (J) {
      J.overlay.css({
        'width': vp_width + 'px',
        'height': vp_height + 'px'
      });
      J.loader.css({
        'width': vp_width + 'px',
        'height': vp_height + 'px'
      });
      return J;
    },
    setPosition = function (J) {
      var
        left = parseInt((vp_width / 2) - (J.content.width() / 2), 0),
        leftc = parseInt((vp_width / 2) - (J.controls.width() / 2), 0),
        top = parseInt($(window).scrollTop() + 100, 0),
        ctrl_top = parseInt(($(window).height() / 2), 0);
      J.content.css({
        'opacity': '1',
        'left': left + 'px',
        'top': top + 'px'
      });
      J.prev_btn.css({
        'top': ctrl_top + 'px'
      });
      J.next_btn.css({
        'top': ctrl_top + 'px'
      });
    },
    openBox = function (J, src) {
      J.overlay.fadeIn('fast');
      J.loader.show();
      if (src) {
        content_img = content_img.replace('#', '').replace('.', '');
        J.content.html('<img src="' + src + '" class="' + content_img + '" />');
        $('.' + content_img).on('load', function () {
          J.loader.hide();
          setPosition(J);
          J.content.fadeIn('fast', function () {
            J.controls.slideDown('fast');
          });
        });
      } else {
        J.loader.hide();
        J.content.fadeIn('fast');
        setPosition(J);
      }
    },
    closeBox = function (J) {
      J.content.find('img').fadeOut('fast');
      J.content.fadeOut('fast');
      J.prev_btn.hide();
      J.next_btn.hide();
      J.overlay.fadeOut('slow');
      J.controls.fadeOut('slow');
    },
    addCloseEvents = function (J) {
      J.overlay.bind('click', function (e) {
        closeBox(J);
        e.stopPropagation();
      });
      J.close_btn.bind('click', function (e) {
        closeBox(J);
        e.stopPropagation();
      });
      $(document).keyup(function (e) {
        if (e.keyCode === 27) {
          closeBox(J);
          e.stopPropagation();
        }
      });
    },
    setTitle = function (J, title) {
      J.sb_title.html(title);
    },
    navGallery = function (J, gal, idx) {
      if (gal) {
        var imgs = [],
          titles = [],
          Jgal = $('.' + gal),
          bg,
          title;
        Jgal.each(function (index) {
          bg = $(this).attr('full-image');
          title = $(this).attr('title');
          imgs[index] = '<img src="' + bg + '" id="img_' + index + '"/>';
          titles[index] = title;
        });
        var prev = function () {
          if (idx < 1) {
            idx = imgs.length;
          } else {
            if (imgs.length <= idx) {
              idx = 0;
            }
          }
          idx = parseInt(idx, 0) - 1;
          $('#img_' + idx).css({
            'opacity': '0'
          });
          J.content.css({
            'opacity': '0'
          });
          J.loader.show();
          J.content.html(imgs[idx]);
          J.sb_title.html(titles[idx]);
          $('#img_' + idx).on('load', function () {
            $('#img_' + idx).css({
              'opacity': '1'
            });
            J.content.css({
              'opacity': '1'
            });
            J.loader.hide();
            setPosition(J);
          });
        }
        var next = function () {
          idx = parseInt(idx, 0) + 1;
          $('#img_' + idx).css({
            'opacity': '0'
          });
          J.content.css({
            'opacity': '0'
          });
          if (imgs.length <= idx) {
            idx = 0;
          }
          J.loader.show();
          J.content.html(imgs[idx]);
          J.sb_title.html(titles[idx]);
          $('#img_' + idx).on('load', function () {
            $('#img_' + idx).css({
              'opacity': '1'
            });
            J.content.css({
              'opacity': '1'
            });
            J.loader.hide();
            setPosition(J);
          });
        }
        J.prev_btn.bind('click', prev);
        J.next_btn.bind('click', next);
        $(document).keydown(function (e) {
          switch (e.which) {
            case 37: // left
              prev();
              break;
            case 39: // right
              next();
              break;
            default:
              return;
          }
          e.preventDefault();
        });
      }
    };
  return {
    init: function () {
      writeStruct();
    },
    showImgs: function (trigger, gal) {
      var J = {
        overlay: $(overlay),
        loader: $(loader),
        content: $(content),
        content_img: $(content_img),
        close_btn: $(close_btn),
        controls: $(controls),
        next_btn: $(next_btn),
        prev_btn: $(prev_btn),
        sb_title: $(sb_title)
      };
      J.content.css({
        'width': 'auto',
        'height': 'auto'
      });
      openBox(J, $(trigger).attr('full-image'));
      setOverlay(J);
      navGallery(J, gal, $(trigger).attr('index'));
      setTitle(J, $(trigger).attr('title'));
      addCloseEvents(J);
      $(prev_btn).show();
      $(next_btn).show();
    },
    showHtml: function (elem) {
      var J = {
        overlay: $(overlay),
        loader: $(loader),
        content: $(content),
        close_btn: $(close_btn),
        controls: $(controls),
        next_btn: $(next_btn),
        prev_btn: $(prev_btn)
      };
      J.content.html($(elem).html());
      if (vp_width > 1000) {
        J.content.css({
          'width': (vp_width * 0.4) + 'px'
        });
      } else if (vp_width > 500) {
        J.content.css({
          'width': (vp_width * 0.5) + 'px'
        });
      } else {
        J.content.css({
          'width': (vp_width * 0.9) + 'px'
        });
      }
      setOverlay(J);
      setPosition(J);
      openBox(J, false);
      J.controls.hide();
      addCloseEvents(J);
    },
    closeShadowbox: function () {
      var J = {
        overlay: $(overlay),
        loader: $(loader),
        content: $(content),
        close_btn: $(close_btn),
        controls: $(controls),
        next_btn: $(next_btn),
        prev_btn: $(prev_btn)
      };
      closeBox(J);
    }
  };
};
$(document).ready(function ($) {
  shadowBox().init();
});