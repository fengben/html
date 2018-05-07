;(function() {
var playback_ad_ad_html, playback_playList_html, playback_player_html, cc_util_etpl, playback_function_camelCase, playback_function_getBrowser, playback_function_getEnv = {}, cc_function_supportFlash = {}, cc_function_split = {}, cc_function_render = {}, cc_function_offsetSecond = {}, playback_function_log = {}, cc_function_offsetMinute = {}, playback_function_camelCaseObject = {}, cc_function_offsetHour = {}, cc_function_offsetDate = {}, cc_util_cookie = {}, playback_function_getUuid, playback_function_statisticReport, playback_ad_ad, playback_player = {};
playback_ad_ad_html = '<div class="bjc-player-ad"><img class="bjc-ad-img" src="${imgUrl}"><div class="bjc-ad-opt"><span class="bjc-timer bjc-hide">&nbsp;<span class="bjc-timer-count">${duration}</span> 秒&nbsp;</span><span class="bjc-skip bjc-hide">跳过广告</span></div><!-- if: ${jumpUrl} --><a class="bjc-ad-more" href="${jumpUrl}" target="_blank">了解详情 &gt;</a><!-- /if --></div>';
playback_playList_html = '<div class="bjc-list-content-item ${className}"vid="${video_id}" vurl="${url}"><img class="bjc-list-content-item-img" src="${cover}"><div class="bjc-list-content-item-content"><div class="bjc-list-content-item-title">\'${title}</div><div class="bjc-list-content-item-play-count">播放量: ${play_count} 次</div></div></div>';
playback_player_html = '<div class="bjc-player-wrapper"><div class="bjc-flash-init bjc-object-wrapper no-play-list"><object id="${swfid}"width="100%" height="100%"type="application/x-shockwave-flash" data="${url}"><param name="movie" value="${url}" /><param name="allowscriptaccess" value="always" /><param name="wmode" value="transparent" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="_swfid=${swfid}" /></object><div class="bjc-section-switch bjc-section-fold bjc-hide"> >></div><div class="bjc-section-switch bjc-section-unfold bjc-hide"> <<</div></div><div class="bjc-error-tip bjc-hide"></div><div class="bjc-list-wrapper bjc-hide"><div class="bjc-title-wrapper">播放目录</div><div class="bjc-list-content-wrapper"></div></div><div class="bjc-player-cover bjc-hide"><div class="bjc-player-circle bjc-hide"><div class="bjc-player-circle-play"></div></div></div><div class="bjc-flash-tip bjc-hide"><div>您还没安装flash播放器,点击<a target="_blank" href="http://www.adobe.com/go/getflash">这里</a>安装</div></div></div>';
cc_util_etpl = function () {
  function extend(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  function Stack() {
    this.raw = [];
    this.length = 0;
  }
  Stack.prototype = {
    push: function (elem) {
      this.raw[this.length++] = elem;
    },
    pop: function () {
      if (this.length > 0) {
        var elem = this.raw[--this.length];
        this.raw.length = this.length;
        return elem;
      }
    },
    top: function () {
      return this.raw[this.length - 1];
    },
    bottom: function () {
      return this.raw[0];
    },
    find: function (condition) {
      var index = this.length;
      while (index--) {
        var item = this.raw[index];
        if (condition(item)) {
          return item;
        }
      }
    }
  };
  var guidIndex = 178245;
  function generateGUID() {
    return '___' + guidIndex++;
  }
  function inherits(subClass, superClass) {
    var F = new Function();
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
  }
  var HTML_ENTITY = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
  };
  function htmlFilterReplacer(c) {
    return HTML_ENTITY[c];
  }
  var DEFAULT_FILTERS = {
    html: function (source) {
      return source.replace(/[&<>"']/g, htmlFilterReplacer);
    },
    url: encodeURIComponent,
    raw: function (source) {
      return source;
    }
  };
  function stringLiteralize(source) {
    return '"' + source.replace(/\x5C/g, '\\\\').replace(/"/g, '\\"').replace(/\x0A/g, '\\n').replace(/\x09/g, '\\t').replace(/\x0D/g, '\\r') + '"';
  }
  function regexpLiteral(source) {
    return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g, function (c) {
      return '\\' + c;
    });
  }
  function stringFormat(source) {
    var args = arguments;
    return source.replace(/\{([0-9]+)\}/g, function (match, index) {
      return args[index - 0 + 1];
    });
  }
  var RENDER_STRING_DECLATION = 'var r="";';
  var RENDER_STRING_ADD_START = 'r+=';
  var RENDER_STRING_ADD_END = ';';
  var RENDER_STRING_RETURN = 'return r;';
  if (typeof navigator !== 'undefined' && /msie\s*([0-9]+)/i.test(navigator.userAgent) && RegExp.$1 - 0 < 8) {
    RENDER_STRING_DECLATION = 'var r=[],ri=0;';
    RENDER_STRING_ADD_START = 'r[ri++]=';
    RENDER_STRING_RETURN = 'return r.join("");';
  }
  function toGetVariableLiteral(name) {
    name = name.replace(/^\s*\*/, '');
    return stringFormat('gv({0},["{1}"])', stringLiteralize(name), name.replace(/\[['"]?([^'"]+)['"]?\]/g, function (match, name) {
      return '.' + name;
    }).split('.').join('","'));
  }
  function parseTextBlock(source, open, close, greedy, onInBlock, onOutBlock) {
    var closeLen = close.length;
    var texts = source.split(open);
    var level = 0;
    var buf = [];
    for (var i = 0, len = texts.length; i < len; i++) {
      var text = texts[i];
      if (i) {
        var openBegin = 1;
        level++;
        while (1) {
          var closeIndex = text.indexOf(close);
          if (closeIndex < 0) {
            buf.push(level > 1 && openBegin ? open : '', text);
            break;
          }
          level = greedy ? level - 1 : 0;
          buf.push(level > 0 && openBegin ? open : '', text.slice(0, closeIndex), level > 0 ? close : '');
          text = text.slice(closeIndex + closeLen);
          openBegin = 0;
          if (level === 0) {
            break;
          }
        }
        if (level === 0) {
          onInBlock(buf.join(''));
          onOutBlock(text);
          buf = [];
        }
      } else {
        text && onOutBlock(text);
      }
    }
    if (level > 0 && buf.length > 0) {
      onOutBlock(open);
      onOutBlock(buf.join(''));
    }
  }
  function compileVariable(source, engine, forText) {
    var code = [];
    var options = engine.options;
    var toStringHead = '';
    var toStringFoot = '';
    var wrapHead = '';
    var wrapFoot = '';
    var defaultFilter;
    if (forText) {
      toStringHead = 'ts(';
      toStringFoot = ')';
      wrapHead = RENDER_STRING_ADD_START;
      wrapFoot = RENDER_STRING_ADD_END;
      defaultFilter = options.defaultFilter;
    }
    parseTextBlock(source, options.variableOpen, options.variableClose, 1, function (text) {
      if (forText && text.indexOf('|') < 0 && defaultFilter) {
        text += '|' + defaultFilter;
      }
      var filterCharIndex = text.indexOf('|');
      var variableName = (filterCharIndex > 0 ? text.slice(0, filterCharIndex) : text).replace(/^\s+/, '').replace(/\s+$/, '');
      var filterSource = filterCharIndex > 0 ? text.slice(filterCharIndex + 1) : '';
      var variableRawValue = variableName.indexOf('*') === 0;
      var variableCode = [
        variableRawValue ? '' : toStringHead,
        toGetVariableLiteral(variableName),
        variableRawValue ? '' : toStringFoot
      ];
      if (filterSource) {
        filterSource = compileVariable(filterSource, engine);
        var filterSegs = filterSource.split('|');
        for (var i = 0, len = filterSegs.length; i < len; i++) {
          var seg = filterSegs[i];
          if (/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(seg)) {
            variableCode.unshift('fs["' + RegExp.$1 + '"](');
            if (RegExp.$3) {
              variableCode.push(',', RegExp.$3);
            }
            variableCode.push(')');
          }
        }
      }
      code.push(wrapHead, variableCode.join(''), wrapFoot);
    }, function (text) {
      code.push(wrapHead, forText ? stringLiteralize(text) : text, wrapFoot);
    });
    return code.join('');
  }
  function TextNode(value, engine) {
    this.value = value;
    this.engine = engine;
  }
  TextNode.prototype = {
    getRendererBody: function () {
      var value = this.value;
      var options = this.engine.options;
      if (!value || options.strip && /^\s*$/.test(value)) {
        return '';
      }
      return compileVariable(value, this.engine, 1);
    },
    clone: function () {
      return this;
    }
  };
  function Command(value, engine) {
    this.value = value;
    this.engine = engine;
    this.children = [];
    this.cloneProps = [];
  }
  Command.prototype = {
    addChild: function (node) {
      this.children.push(node);
    },
    open: function (context) {
      var parent = context.stack.top();
      parent && parent.addChild(this);
      context.stack.push(this);
    },
    close: function (context) {
      if (context.stack.top() === this) {
        context.stack.pop();
      }
    },
    getRendererBody: function () {
      var buf = [];
      var children = this.children;
      for (var i = 0; i < children.length; i++) {
        buf.push(children[i].getRendererBody());
      }
      return buf.join('');
    },
    clone: function () {
      var Clazz = this.constructor;
      var node = new Clazz(this.value, this.engine);
      for (var i = 0, l = this.children.length; i < l; i++) {
        node.addChild(this.children[i].clone());
      }
      for (var i = 0, l = this.cloneProps.length; i < l; i++) {
        var prop = this.cloneProps[i];
        node[prop] = this[prop];
      }
      return node;
    }
  };
  function autoCloseCommand(context, CommandType) {
    var stack = context.stack;
    var closeEnd = CommandType ? stack.find(function (item) {
      return item instanceof CommandType;
    }) : stack.bottom();
    if (closeEnd) {
      var node;
      while ((node = stack.top()) !== closeEnd) {
        if (!node.autoClose) {
          throw new Error(node.type + ' must be closed manually: ' + node.value);
        }
        node.autoClose(context);
      }
      closeEnd.close(context);
    }
    return closeEnd;
  }
  var RENDERER_BODY_START = '' + 'data=data||{};' + 'var v={},fs=engine.filters,hg=typeof data.get=="function",' + 'gv=function(n,ps){' + 'var p=ps[0],d=v[p];' + 'if(d==null){' + 'if(hg){return data.get(n);}' + 'd=data[p];' + '}' + 'for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];' + 'return d;' + '},' + 'ts=function(s){' + 'if(typeof s==="string"){return s;}' + 'if(s==null){s="";}' + 'return ""+s;' + '};';
  function TargetCommand(value, engine) {
    if (!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.master = RegExp.$3;
    this.name = RegExp.$1;
    Command.call(this, value, engine);
    this.blocks = {};
  }
  inherits(TargetCommand, Command);
  function BlockCommand(value, engine) {
    if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.name = RegExp.$1;
    Command.call(this, value, engine);
    this.cloneProps = ['name'];
  }
  inherits(BlockCommand, Command);
  function ImportCommand(value, engine) {
    if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.name = RegExp.$1;
    Command.call(this, value, engine);
    this.cloneProps = [
      'name',
      'state',
      'blocks'
    ];
    this.blocks = {};
  }
  inherits(ImportCommand, Command);
  function VarCommand(value, engine) {
    if (!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.name = RegExp.$1;
    this.expr = RegExp.$2;
    Command.call(this, value, engine);
    this.cloneProps = [
      'name',
      'expr'
    ];
  }
  inherits(VarCommand, Command);
  function FilterCommand(value, engine) {
    if (!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.name = RegExp.$1;
    this.args = RegExp.$3;
    Command.call(this, value, engine);
    this.cloneProps = [
      'name',
      'args'
    ];
  }
  inherits(FilterCommand, Command);
  function UseCommand(value, engine) {
    if (!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.name = RegExp.$1;
    this.args = RegExp.$3;
    Command.call(this, value, engine);
    this.cloneProps = [
      'name',
      'args'
    ];
  }
  inherits(UseCommand, Command);
  function ForCommand(value, engine) {
    var rule = new RegExp(stringFormat('^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$', regexpLiteral(engine.options.variableOpen), regexpLiteral(engine.options.variableClose)), 'i');
    if (!rule.test(value)) {
      throw new Error('Invalid ' + this.type + ' syntax: ' + value);
    }
    this.list = RegExp.$1;
    this.item = RegExp.$2;
    this.index = RegExp.$4;
    Command.call(this, value, engine);
    this.cloneProps = [
      'list',
      'item',
      'index'
    ];
  }
  inherits(ForCommand, Command);
  function IfCommand(value, engine) {
    Command.call(this, value, engine);
  }
  inherits(IfCommand, Command);
  function ElifCommand(value, engine) {
    IfCommand.call(this, value, engine);
  }
  inherits(ElifCommand, IfCommand);
  function ElseCommand(value, engine) {
    Command.call(this, value, engine);
  }
  inherits(ElseCommand, IfCommand);
  var TargetState = {
    READING: 1,
    READED: 2,
    APPLIED: 3,
    READY: 4
  };
  ImportCommand.prototype.applyMaster = TargetCommand.prototype.applyMaster = function (masterName) {
    if (this.state >= TargetState.APPLIED) {
      return 1;
    }
    var blocks = this.blocks;
    function replaceBlock(node) {
      var children = node.children;
      if (children instanceof Array) {
        for (var i = 0, len = children.length; i < len; i++) {
          var child = children[i];
          if (child instanceof BlockCommand && blocks[child.name]) {
            child = children[i] = blocks[child.name];
          }
          replaceBlock(child);
        }
      }
    }
    var master = this.engine.targets[masterName];
    if (master && master.applyMaster(master.master)) {
      this.children = master.clone().children;
      replaceBlock(this);
      this.state = TargetState.APPLIED;
      return 1;
    }
  };
  TargetCommand.prototype.isReady = function () {
    if (this.state >= TargetState.READY) {
      return 1;
    }
    var engine = this.engine;
    var readyState = 1;
    function checkReadyState(node) {
      for (var i = 0, len = node.children.length; i < len; i++) {
        var child = node.children[i];
        if (child instanceof ImportCommand) {
          var target = engine.targets[child.name];
          readyState = readyState && target && target.isReady(engine);
        } else if (child instanceof Command) {
          checkReadyState(child);
        }
      }
    }
    if (this.applyMaster(this.master)) {
      checkReadyState(this);
      readyState && (this.state = TargetState.READY);
      return readyState;
    }
  };
  TargetCommand.prototype.getRenderer = function () {
    if (this.renderer) {
      return this.renderer;
    }
    if (this.isReady()) {
      var realRenderer = new Function('data', 'engine', [
        RENDERER_BODY_START,
        RENDER_STRING_DECLATION,
        this.getRendererBody(),
        RENDER_STRING_RETURN
      ].join('\n'));
      var engine = this.engine;
      this.renderer = function (data) {
        return realRenderer(data, engine);
      };
      return this.renderer;
    }
    return null;
  };
  function addTargetToContext(target, context) {
    context.target = target;
    var engine = context.engine;
    var name = target.name;
    if (engine.targets[name]) {
      switch (engine.options.namingConflict) {
      case 'override':
        engine.targets[name] = target;
        context.targets.push(name);
      case 'ignore':
        break;
      default:
        throw new Error('Target exists: ' + name);
      }
    } else {
      engine.targets[name] = target;
      context.targets.push(name);
    }
  }
  TargetCommand.prototype.open = function (context) {
    autoCloseCommand(context);
    Command.prototype.open.call(this, context);
    this.state = TargetState.READING;
    addTargetToContext(this, context);
  };
  VarCommand.prototype.open = UseCommand.prototype.open = function (context) {
    context.stack.top().addChild(this);
  };
  BlockCommand.prototype.open = function (context) {
    Command.prototype.open.call(this, context);
    context.stack.find(function (node) {
      return node.blocks;
    }).blocks[this.name] = this;
  };
  ElifCommand.prototype.open = function (context) {
    var elseCommand = new ElseCommand();
    elseCommand.open(context);
    var ifCommand = autoCloseCommand(context, IfCommand);
    ifCommand.addChild(this);
    context.stack.push(this);
  };
  ElseCommand.prototype.open = function (context) {
    var ifCommand = autoCloseCommand(context, IfCommand);
    ifCommand.addChild(this);
    context.stack.push(this);
  };
  ImportCommand.prototype.open = function (context) {
    this.parent = context.stack.top();
    this.target = context.target;
    Command.prototype.open.call(this, context);
    this.state = TargetState.READING;
  };
  UseCommand.prototype.close = VarCommand.prototype.close = function () {
  };
  ImportCommand.prototype.close = function (context) {
    Command.prototype.close.call(this, context);
    this.state = TargetState.READED;
  };
  TargetCommand.prototype.close = function (context) {
    Command.prototype.close.call(this, context);
    this.state = this.master ? TargetState.READED : TargetState.APPLIED;
    context.target = null;
  };
  ImportCommand.prototype.autoClose = function (context) {
    var parentChildren = this.parent.children;
    parentChildren.push.apply(parentChildren, this.children);
    this.children.length = 0;
    for (var key in this.blocks) {
      this.target.blocks[key] = this.blocks[key];
    }
    this.blocks = {};
    this.close(context);
  };
  UseCommand.prototype.beforeOpen = ImportCommand.prototype.beforeOpen = VarCommand.prototype.beforeOpen = ForCommand.prototype.beforeOpen = FilterCommand.prototype.beforeOpen = BlockCommand.prototype.beforeOpen = IfCommand.prototype.beforeOpen = TextNode.prototype.beforeAdd = function (context) {
    if (context.stack.bottom()) {
      return;
    }
    var target = new TargetCommand(generateGUID(), context.engine);
    target.open(context);
  };
  ImportCommand.prototype.getRendererBody = function () {
    this.applyMaster(this.name);
    return Command.prototype.getRendererBody.call(this);
  };
  UseCommand.prototype.getRendererBody = function () {
    return stringFormat('{0}engine.render({2},{{3}}){1}', RENDER_STRING_ADD_START, RENDER_STRING_ADD_END, stringLiteralize(this.name), compileVariable(this.args, this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi, function (match, start, argName) {
      return (start || '') + stringLiteralize(argName) + ':';
    }));
  };
  VarCommand.prototype.getRendererBody = function () {
    if (this.expr) {
      return stringFormat('v[{0}]={1};', stringLiteralize(this.name), compileVariable(this.expr, this.engine));
    }
    return '';
  };
  IfCommand.prototype.getRendererBody = function () {
    return stringFormat('if({0}){{1}}', compileVariable(this.value, this.engine), Command.prototype.getRendererBody.call(this));
  };
  ElseCommand.prototype.getRendererBody = function () {
    return stringFormat('}else{{0}', Command.prototype.getRendererBody.call(this));
  };
  ForCommand.prototype.getRendererBody = function () {
    return stringFormat('' + 'var {0}={1};' + 'if({0} instanceof Array)' + 'for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}' + 'else if(typeof {0}==="object")' + 'for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}', generateGUID(), compileVariable(this.list, this.engine), stringLiteralize(this.index || generateGUID()), stringLiteralize(this.item), generateGUID(), generateGUID(), Command.prototype.getRendererBody.call(this));
  };
  FilterCommand.prototype.getRendererBody = function () {
    var args = this.args;
    return stringFormat('{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}', RENDER_STRING_DECLATION, RENDER_STRING_RETURN, RENDER_STRING_ADD_START, RENDER_STRING_ADD_END, Command.prototype.getRendererBody.call(this), stringLiteralize(this.name), args ? ',' + compileVariable(args, this.engine) : '');
  };
  var commandTypes = {};
  function addCommandType(name, Type) {
    commandTypes[name] = Type;
    Type.prototype.type = name;
  }
  addCommandType('target', TargetCommand);
  addCommandType('block', BlockCommand);
  addCommandType('import', ImportCommand);
  addCommandType('use', UseCommand);
  addCommandType('var', VarCommand);
  addCommandType('for', ForCommand);
  addCommandType('if', IfCommand);
  addCommandType('elif', ElifCommand);
  addCommandType('else', ElseCommand);
  addCommandType('filter', FilterCommand);
  function Engine(options) {
    this.options = {
      commandOpen: '<!--',
      commandClose: '-->',
      commandSyntax: /^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,
      variableOpen: '${',
      variableClose: '}',
      defaultFilter: 'html'
    };
    this.config(options);
    this.targets = {};
    this.filters = extend({}, DEFAULT_FILTERS);
  }
  Engine.prototype.config = function (options) {
    extend(this.options, options);
  };
  Engine.prototype.compile = Engine.prototype.parse = function (source) {
    if (source) {
      var targetNames = parseSource(source, this);
      if (targetNames.length) {
        return this.targets[targetNames[0]].getRenderer();
      }
    }
    return new Function('return ""');
  };
  Engine.prototype.getRenderer = function (name) {
    var target = this.targets[name];
    if (target) {
      return target.getRenderer();
    }
  };
  Engine.prototype.render = function (name, data) {
    var renderer = this.getRenderer(name);
    if (renderer) {
      return renderer(data);
    }
    return '';
  };
  Engine.prototype.addFilter = function (name, filter) {
    if (typeof filter === 'function') {
      this.filters[name] = filter;
    }
  };
  function parseSource(source, engine) {
    var commandOpen = engine.options.commandOpen;
    var commandClose = engine.options.commandClose;
    var commandSyntax = engine.options.commandSyntax;
    var stack = new Stack();
    var analyseContext = {
      engine: engine,
      targets: [],
      stack: stack,
      target: null
    };
    var textBuf = [];
    function flushTextBuf() {
      var text;
      if (textBuf.length > 0 && (text = textBuf.join(''))) {
        var textNode = new TextNode(text, engine);
        textNode.beforeAdd(analyseContext);
        stack.top().addChild(textNode);
        textBuf = [];
        if (engine.options.strip && analyseContext.current instanceof Command) {
          textNode.value = text.replace(/^[\x20\t\r]*\n/, '');
        }
        analyseContext.current = textNode;
      }
    }
    var NodeType;
    parseTextBlock(source, commandOpen, commandClose, 0, function (text) {
      var match = commandSyntax.exec(text);
      if (match && (NodeType = commandTypes[match[2].toLowerCase()]) && typeof NodeType === 'function') {
        flushTextBuf();
        var currentNode = analyseContext.current;
        if (engine.options.strip && currentNode instanceof TextNode) {
          currentNode.value = currentNode.value.replace(/\r?\n[\x20\t]*$/, '\n');
        }
        if (match[1]) {
          currentNode = autoCloseCommand(analyseContext, NodeType);
        } else {
          currentNode = new NodeType(match[3], engine);
          if (typeof currentNode.beforeOpen === 'function') {
            currentNode.beforeOpen(analyseContext);
          }
          currentNode.open(analyseContext);
        }
        analyseContext.current = currentNode;
      } else if (!/^\s*\/\//.test(text)) {
        textBuf.push(commandOpen, text, commandClose);
      }
      NodeType = null;
    }, function (text) {
      textBuf.push(text);
    });
    flushTextBuf();
    autoCloseCommand(analyseContext);
    return analyseContext.targets;
  }
  var etpl = new Engine();
  etpl.Engine = Engine;
  return etpl;
}();
playback_function_camelCase = function (str) {
  if ($.type(str) !== 'string') {
    str = '' + str;
  }
  if (str.indexOf('_') >= 0) {
    str = str.replace(/_/g, '-');
    return $.camelCase(str);
  }
  return str;
};
playback_function_getBrowser = function getBrowser() {
  var userAgent = navigator.userAgent.toLowerCase();
  var isOpera = userAgent.indexOf('opera') > -1;
  if (isOpera) {
    return 1;
  }
  if (userAgent.indexOf('firefox') > -1) {
    return 5;
  }
  if (userAgent.indexOf('chrome') > -1) {
    return 3;
  }
  if (userAgent.indexOf('safari') > -1) {
    return 6;
  }
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('msie') > -1 && !isOpera) {
    return 2;
  }
  if (/rv:(\S)+\) like gecko/.test(userAgent)) {
    return 2;
  } else {
    return 7;
  }
};
playback_function_getEnv = function getEnv() {
  var host = window.location.hostname;
  if (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(host)) {
    return 'local';
  }
  if (host.indexOf('test') != -1) {
    return 'test';
  }
  if (host.indexOf('beta') != -1) {
    return 'beta';
  }
  return 'prod';
};
cc_function_supportFlash = function () {
  var swf;
  var plugins = navigator.plugins;
  if (plugins && plugins.length > 0) {
    swf = plugins['Shockwave Flash'];
  } else if (document.all) {
    try {
      swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    } catch (e) {
    }
  }
  return !!swf;
};
cc_function_split = function (str, sep) {
  var result = [];
  if ($.type(str) === 'number') {
    str = '' + str;
  }
  if (str && $.type(str) === 'string') {
    $.each(str.split(sep), function (index, part) {
      part = $.trim(part);
      if (part) {
        result.push(part);
      }
    });
  }
  return result;
};
cc_function_render = function (tpl, data) {
  $.each(data, function (key, value) {
    tpl = tpl.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), function () {
      return value;
    });
  });
  return tpl;
};
cc_function_offsetSecond = function (date, offset) {
  if ($.type(date) === 'date') {
    date = date.getTime();
  }
  return new Date(date + offset * 1000);
};
playback_function_log = function (exports) {
  var imageList = [];
  var send = function (url, data) {
    var params = data || {};
    var target = (url || liveUrl) + '?' + $.param(params);
    var img = new Image();
    var index = imageList.push(img) - 1;
    var complete = function () {
      img = img.onload = img.onerror = null;
      delete imageList[index];
    };
    img.onload = complete;
    img.onerror = function () {
      complete();
      setTimeout(function () {
        send(url, data);
      }, 1000);
    };
    img.src = target;
  };
  return send;
}(playback_function_log);
cc_function_offsetMinute = function (exports) {
  var offsetSecond = cc_function_offsetSecond;
  return function (date, offset) {
    return offsetSecond(date, offset * 60);
  };
}(cc_function_offsetMinute);
playback_function_camelCaseObject = function (exports) {
  var camelCase = playback_function_camelCase;
  function camelCaseObject(obj) {
    var result = $.isArray(obj) ? [] : {};
    $.each(obj, function (key, value) {
      if ($.isPlainObject(value) || $.isArray(value)) {
        value = camelCaseObject(value);
      }
      result[camelCase(key)] = value;
    });
    return result;
  }
  return camelCaseObject;
}(playback_function_camelCaseObject);
cc_function_offsetHour = function (exports) {
  var offsetMinute = cc_function_offsetMinute;
  return function (date, offset) {
    return offsetMinute(date, offset * 60);
  };
}(cc_function_offsetHour);
cc_function_offsetDate = function (exports) {
  var offsetHour = cc_function_offsetHour;
  return function (date, offset) {
    return offsetHour(date, offset * 24);
  };
}(cc_function_offsetDate);
cc_util_cookie = function (exports) {
  var split = cc_function_split;
  var offsetHour = cc_function_offsetDate;
  function parse(cookieStr) {
    if (cookieStr.indexOf('"') === 0) {
      cookieStr = cookieStr.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    var result = {};
    try {
      cookieStr = decodeURIComponent(cookieStr.replace(/\+/g, ' '));
      $.each(split(cookieStr, ';'), function (index, part) {
        var terms = split(part, '=');
        var key = terms[0];
        var value = terms[1];
        if (key) {
          result[key] = value;
        }
      });
    } catch (e) {
    }
    return result;
  }
  function setCookie(key, value, options) {
    var expires = options.expires;
    if ($.isNumeric(expires)) {
      expires = offsetHour(new Date(), expires);
    }
    document.cookie = [
      encodeURIComponent(key),
      '=',
      encodeURIComponent(value),
      expires ? ';expires=' + expires.toUTCString() : '',
      options.path ? ';path=' + options.path : '',
      options.domain ? ';domain=' + options.domain : '',
      options.secure ? ';secure' : ''
    ].join('');
  }
  exports.get = function (key) {
    var result = parse(document.cookie);
    return $.type(key) === 'string' ? result[key] : result;
  };
  exports.set = function (key, value, options) {
    if ($.isPlainObject(key)) {
      options = value;
      value = null;
    }
    options = $.extend({}, exports.defaultOptions, options);
    if (value === null) {
      $.each(key, function (key, value) {
        setCookie(key, value, options);
      });
    } else {
      setCookie(key, value, options);
    }
  };
  exports.remove = function (key, options) {
    options = options || {};
    options.expires = -1;
    setCookie(key, '', $.extend({}, exports.defaultOptions, options));
  };
  exports.defaultOptions = {};
  return exports;
}(cc_util_cookie);
playback_function_getUuid = function (require) {
  var cookie = cc_util_cookie;
  function s4() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  function guid() {
    return [
      s4() + s4(),
      s4(),
      s4(),
      s4(),
      s4() + s4() + s4()
    ].join('-');
  }
  return function getUuid() {
    if (!cookie.get('uuid')) {
      var uuid = guid();
      cookie.set('uuid', 'uuid-' + uuid);
    }
    return cookie.get('uuid');
  };
}({});
playback_function_statisticReport = function (require) {
  var getBrowser = playback_function_getBrowser;
  var getUuid = playback_function_getUuid;
  var getEnv = playback_function_getEnv;
  var log = playback_function_log;
  var version = '0.0.1';
  return function (data) {
    var uuid = getUuid();
    var customstr = window.bjcCustomReportString;
    var result = {};
    if (customstr) {
      var item = customstr.split('&');
      for (var i = 0; i < item.length; i++) {
        var key = item[i].split('=')[0];
        result[key] = item[i].split('=')[1];
      }
    }
    var webData = {
      clientype: 5,
      net: 1,
      uuid: uuid,
      browser: getBrowser(),
      version: version,
      env: getEnv(),
      customstr: window.bjcCustomReportString || '',
      user_number: result.user_number,
      user_name: result.user_name
    };
    $.extend(true, data, webData);
    log('http://click.baijiayun.com/gs.gif', data);
  };
}({});
playback_ad_ad = function (require) {
  var etpl = cc_util_etpl;
  var statisticReport = playback_function_statisticReport;
  var renderElement = etpl.compile(playback_ad_ad_html);
  var REPORT_TYPE_SHOW = 0;
  var REPORT_TYPE_CLICK = 1;
  function Advert(container, options) {
    var defaultValue = {
      showTimer: true,
      duration: 10,
      width: 100,
      height: 100,
      canSkip: true,
      canSkipSeconds: 5
    };
    this.container = container;
    this.options = $.extend({}, defaultValue, options);
  }
  Advert.prototype.init = function () {
    var me = this;
    var options = me.options;
    var container = me.container;
    me.content = $(renderElement(options));
    me.setSize();
    $(window).resize(function () {
      me.setSize();
    });
    container.append(this.content);
    me.container.addClass('bjc-ad-show');
    if (options.showTimer) {
      container.find('.bjc-timer').removeClass('bjc-hide');
    }
    me.beginTimer();
    container.find('.bjc-ad-more').click(function () {
      me.log(REPORT_TYPE_CLICK);
    });
    me.log(REPORT_TYPE_SHOW);
  };
  Advert.prototype.setSize = function () {
    var size = this.computeContentSize();
    this.content.find('.bjc-ad-img').css({
      width: size.width,
      height: size.height,
      left: size.left,
      top: size.top
    });
  };
  Advert.prototype.beginTimer = function () {
    var me = this;
    var options = me.options;
    var duration = options.duration;
    var ele = me.container.find('.bjc-timer-count');
    var container = me.container;
    me.timer = setInterval(function () {
      duration--;
      var watched = me.options.duration - duration;
      if (options.canSkip && watched == options.canSkipSeconds) {
        var skipEle = container.find('.bjc-skip');
        skipEle.removeClass('bjc-hide');
        skipEle.click(function () {
          me.finished();
        });
      }
      if (duration == 0) {
        me.finished();
      }
      ele.html(duration);
    }, 1000);
  };
  Advert.prototype.finished = function () {
    var me = this;
    me.content.remove();
    me.container.removeClass('bjc-ad-show');
    clearInterval(me.timer);
    if (me.options.onfinish) {
      me.options.onfinish();
    }
  };
  Advert.prototype.computeContentSize = function () {
    var me = this;
    var container = me.container;
    var options = me.options;
    var containerWidth = container.width();
    var containerHeight = container.height() - 20;
    var resWidth = containerWidth;
    var resHeight = Math.ceil(containerWidth * options.height / options.width);
    var top = (containerHeight - resHeight) / 2;
    var left = 0;
    if (resHeight > containerHeight) {
      resWidth = Math.ceil(containerHeight * options.width / options.height);
      resHeight = containerHeight;
      top = 10;
      left = (containerWidth - resWidth) / 2;
    }
    return {
      width: resWidth,
      height: resHeight,
      left: left + 'px',
      top: top + 'px'
    };
  };
  Advert.prototype.log = function (reportType) {
    var me = this;
    var options = me.options;
    var videoInfo = options.videoInfo;
    var data = {
      type: 'baijiayun_ad',
      guid: videoInfo.guid,
      fid: videoInfo.video_id,
      partner_id: videoInfo.video_info.partner_id,
      ad_id: options.id
    };
    data.report_type = reportType;
    statisticReport(data);
  };
  return Advert;
}({});
playback_player = function (exports) {
  var swfElement = '';
  window.playerInstance = {};
  var HEAD_TYPE = 'head';
  var CONTENT_TYPE = 'content';
  var TAIL_TYPE = 'tail';
  var render = cc_function_render;
  var supportFlash = cc_function_supportFlash;
  var AD_TYPE_IMG = 0;
  var Advert = playback_ad_ad;
  var statisticReport = playback_function_statisticReport;
  var camelCaseObject = playback_function_camelCaseObject;
  var getEnv = playback_function_getEnv;
  var getUuid = playback_function_getUuid;
  var firstPlay = true;
  function BjcPlayer(dom, param) {
    if (typeof param.withPlayList == 'undefined') {
      param.withPlayList = false;
    }
    if (!param.token) {
      alert('请传入token');
      this.paramValid = false;
      return;
    }
    this.paramValid = true;
    this.dom = $(dom);
    this.param = param;
    this.swfid = new Date().getTime();
    window.bjcCustomReportString = param.customReportString;
    if (param.user_number) {
      window.bjcCustomReportString = window.bjcCustomReportString ? window.bjcCustomReportString + '&user_number=' + param.user_number : 'user_number=' + param.user_number;
    }
    if (param.user_name) {
      window.bjcCustomReportString = window.bjcCustomReportString ? window.bjcCustomReportString + '&user_name=' + param.user_name : 'user_name=' + param.user_name;
    }
    this.initPlay(dom, param);
  }
  BjcPlayer.prototype.initPlay = function (dom, param) {
    var me = this;
    me.initSwf();
  };
  BjcPlayer.prototype.showFlashTip = function () {
    var me = this;
    me.dom.find('.bjc-flash-tip').removeClass('bjc-hide');
  };
  BjcPlayer.prototype.initSwf = function () {
    var url = '//www.baijiayun.com/web/playback/asset/playback/BJYPlayer.swf?v=1522305713228';
    var me = this;
    var dom = me.dom;
    var wrapper = $(render(playback_player_html, {
      url: url,
      swfid: me.swfid
    }));
    dom.append(wrapper);
    if (!supportFlash()) {
      me.showFlashTip();
    }
    dom.find('.bjc-section-fold').click(function () {
      me.foldSwitch(true);
    });
    dom.find('.bjc-section-unfold').click(function () {
      me.foldSwitch(false);
    });
    me.initSwfEvent();
  };
  BjcPlayer.prototype.setCustomReportStr = function (str) {
    window.bjcCustomReportString = str;
  };
  BjcPlayer.prototype.getVideoInfoFirstTime = function (vid, sid) {
    var me = this;
    var param = me.param;
    var videoInfoJsonp = '//www.baijiayun.com/vod/video/getPlayUrl';
    if (getEnv() == 'local') {
      videoInfoJsonp = 'http://api.baijiayun.com/vod/video/getPlayUrl';
    }
    var reqParam = [
      'vid=' + vid,
      'sid=' + sid,
      'render=jsonp',
      'client_type=flash',
      'ver=2'
    ];
    if (param.token == 'wannengtoken') {
      reqParam.push('skip_verify=1');
    } else {
      reqParam.push('token=' + param.token);
    }
    if (param.pid) {
      reqParam.push('pid=' + param.pid);
    }
    me.getPlayData(videoInfoJsonp + '?' + reqParam.join('&'), me.firstReqCallback);
  };
  BjcPlayer.prototype.play = function (vid, sid) {
    var me = this;
    var param = me.param;
    if (!me.paramValid) {
      return;
    }
    if (param.withPlayList && !sid) {
      alert('带播放列表的播放,请传入sid');
      return;
    }
    me.curVid = vid;
    me.swfStopPlay();
    me.getVideoInfoFirstTime(vid, sid);
  };
  BjcPlayer.prototype.initSwfEvent = function () {
    var me = this;
    var dom = me.dom;
    var swfElement = me.swfElement = dom.find('object').get(0);
    var param = me.param;
    swfElement.onready = function () {
      me.flashReady = true;
      me.tryShowArrow();
      excuteInterface(me.swfElement, 'draggable', { value: me.param.draggable === false ? 0 : 1 });
      if (me.resData && me.param.autoplay != false) {
        me.tryBeginPlay();
      }
      dom.find('.bjc-object-wrapper').removeClass('bjc-flash-init');
    };
    swfElement.onplayfail = function (error) {
      param.onplayfail && param.onplayfail({
        error: {
          code: 101,
          msg: '播放器出错'
        },
        errorDetail: error,
        vid: param.vid
      });
    };
    swfElement.onplayfinish = function (data) {
      var info = me.info;
      info.contentType = data.contentType;
      me.swfStopPlay();
      param.onplayfinish && param.onplayfinish(info);
      function onfinish() {
        me.playNext(info.video_id);
      }
      var ad = me.resData && me.resData.data.ad;
      if (ad && ad.end.length > 0 && ad.end[0].adType == AD_TYPE_IMG && !me.endAd) {
        var adValues = ad.end[0];
        me.endAd = advertFactory(me.dom.find('.bjc-player-wrapper'), adValues, onfinish, me.resData.data);
        me.endAd.init();
      } else {
        onfinish();
      }
    };
    swfElement.onpartfinish = function (data) {
      var info = me.info;
      info.contentType = data.contentType;
      param.onpartfinish && param.onpartfinish(info);
    };
    swfElement.onplaybegin = function (data) {
      var info = me.info;
      info.contentType = data.contentType;
      param.onplaybegin && param.onplaybegin(info);
    };
    swfElement.onplaypause = function (data) {
      param.onplaypause && param.onplaypause(me.info);
    };
    swfElement.ontimeupdate = function (data) {
      me.currentTime = data.currentTime;
      param.ontimeupdate && param.ontimeupdate(data.currentTime);
    };
    swfElement.onseek = function (data) {
      param.onseeked && param.onseeked(data.currentTime);
    };
    swfElement.onfullscreen = function (data) {
      param.onfullscreen && param.onfullscreen(data.value, data);
    };
    swfElement.onvolumechange = function (data) {
      param.onvolumechange && param.onvolumechange(data.value, data);
    };
    swfElement.onresume = function (data) {
      param.onresume && param.onresume(data);
    };
    swfElement.playNext = function (vid) {
      me.playNext(vid);
    };
    if (!window.playerInstance[me.swfid]) {
      window.playerInstance[me.swfid] = {};
    }
    window.playerInstance[me.swfid].swfElement = swfElement;
  };
  BjcPlayer.prototype.foldSwitch = function (fold) {
    var me = this;
    var dom = me.dom;
    var foldEle = dom.find('.bjc-section-fold');
    var unfoldEle = dom.find('.bjc-section-unfold');
    if (fold) {
      foldEle.addClass('bjc-hide');
      unfoldEle.removeClass('bjc-hide');
      dom.find('.bjc-list-wrapper').addClass('bjc-hide');
      dom.find('.bjc-object-wrapper').addClass('no-play-list');
    } else {
      foldEle.removeClass('bjc-hide');
      unfoldEle.addClass('bjc-hide');
      dom.find('.bjc-list-wrapper').removeClass('bjc-hide');
      dom.find('.bjc-object-wrapper').removeClass('no-play-list');
    }
  };
  BjcPlayer.prototype.playNext = function (vid) {
    var me = this;
    var dom = me.dom;
    var playInfo = me.getNextVideoInfo(vid);
    if (playInfo == -1) {
      firstPlay = true;
      if (me.resData.data.video_auto_replay) {
        me.play(vid);
      }
      return;
    }
    me.vid = playInfo.video_id;
    dom.find('.bjc-list-content-item').removeClass('active');
    dom.find('.bjc-list-content-item[vid=' + playInfo.video_id + ']').addClass('active');
    me.getPlayData(playInfo.url + '&render=jsonp', me.getListVideoInfoCallback);
  };
  BjcPlayer.prototype.getNextVideoInfo = function (vid) {
    var me = this;
    var section = me.info.section_list;
    for (var i = 0, item; item = section[i++];) {
      if (item.video_id == vid) {
        return section[i];
      }
    }
    return -1;
  };
  BjcPlayer.prototype.tryShowArrow = function () {
    var me = this;
    var dom = me.dom;
    if (me.flashReady && me.resData) {
      dom.find('.bjc-player-circle').removeClass('bjc-hide');
    }
  };
  BjcPlayer.prototype.firstReqCallback = function (json) {
    var me = this;
    var data = json.data;
    var dom = me.dom;
    me.info = data;
    me.resData = json;
    me.vid = data.video_id;
    me.tryBeginPlay();
    if (me.param.autoplay == false && firstPlay) {
      dom.find('.bjc-player-cover').removeClass('bjc-hide');
      dom.find('.bjc-player-cover').find('img').remove();
      me.tryShowArrow();
      me.appendCoverImg(data.init_pic);
      dom.find('.bjc-player-cover').click(function () {
        if (!me.flashReady || !me.resData) {
          return;
        }
        if (firstPlay) {
          dom.find('.bjc-player-cover').addClass('bjc-hide');
          me.play(me.vid, me.param.sid);
          firstPlay = false;
          dom.find('.bjc-player-cover').find('img').remove();
        }
      });
      return;
    }
    var sectionList = data.section_list;
    if (me.param.withPlayList && sectionList.length) {
      dom.find('.bjc-list-wrapper').removeClass('bjc-hide');
      dom.find('.bjc-section-fold').removeClass('bjc-hide');
      dom.find('.bjc-object-wrapper').removeClass('no-play-list');
      me.renderPlayList(sectionList, me.vid);
    }
  };
  BjcPlayer.prototype.appendCoverImg = function (src) {
    var me = this;
    var dom = me.dom;
    var img = $('<img src="' + src + '">');
    dom.find('.bjc-player-cover').append(img);
    img.load(function () {
      computeContentSize(img);
      $(window).resize(function () {
        computeContentSize(img);
      });
    });
    function computeContentSize(img) {
      var container = me.dom;
      var containerWidth = container.width();
      var imgWidth = img.width();
      var imgHeight = img.height();
      var containerHeight = container.height();
      var resWidth = containerWidth;
      var resHeight = Math.ceil(containerWidth * imgHeight / imgWidth);
      var top = (containerHeight - resHeight) / 2;
      var left = 0;
      if (resHeight > containerHeight) {
        resWidth = Math.ceil(containerHeight * imgWidth / imgHeight);
        resHeight = containerHeight;
        top = 0;
        left = (containerWidth - resWidth) / 2;
      }
      var size = {
        width: resWidth,
        height: resHeight,
        left: left + 'px',
        top: top + 'px'
      };
      img.css({
        width: size.width,
        height: size.height,
        left: size.left,
        top: size.top
      });
    }
  };
  BjcPlayer.prototype.tryBeginPlay = function () {
    var me = this;
    var tryPlay = function () {
      if (me.flashReady && me.resData) {
        me.startPlayByData(me.swfElement, me.resData);
      }
    };
    var dom = me.dom;
    if (me.param.autoplay == false && firstPlay) {
      dom.find('.bjc-player-cover').removeClass('bjc-hide');
      dom.find('.bjc-player-cover').find('img').remove();
      me.appendCoverImg(me.resData.data.init_pic);
      dom.find('.bjc-player-cover').click(function () {
        if (!me.flashReady || !me.resData) {
          return;
        }
        if (firstPlay) {
          dom.find('.bjc-player-cover').addClass('bjc-hide');
          if (me.flashReady && me.resData) {
            me.startPlayByData(me.swfElement, me.resData);
          }
        }
        firstPlay = false;
      });
      return;
    }
    var ad = me.resData && me.resData.data.ad;
    if (ad && ad.start.length > 0 && ad.start[0].adType == AD_TYPE_IMG) {
      var adValues = ad.start[0];
      if (!me.startAd) {
        me.startAd = advertFactory(me.dom.find('.bjc-player-wrapper'), adValues, tryPlay, me.resData.data);
        me.startAd.init();
      }
    } else {
      tryPlay();
    }
  };
  BjcPlayer.prototype.getPlayData = function (url, callback) {
    var me = this;
    var param = me.param;
    $.ajax({
      type: 'get',
      async: false,
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function (json) {
        if (json.code == 0) {
          if (json.data.ad) {
            json.data.ad = camelCaseObject(json.data.ad);
          }
          callback.call(me, json);
        } else {
          json.msg && me.showErrorTip(json.msg);
          param.onplayfail && param.onplayfail({
            error: {
              code: json.code,
              msg: json.msg
            },
            vid: param.vid
          });
        }
      },
      error: function () {
        me.showErrorTip('出错啦~');
        param.onplayfail && param.onplayfail({
          error: {
            code: 301,
            msg: '服务器出错'
          },
          vid: param.vid
        });
      }
    });
  };
  BjcPlayer.prototype.showErrorTip = function (data) {
    var me = this;
    var dom = me.dom;
    var errorTip = dom.find('.bjc-error-tip');
    if (data) {
      errorTip.removeClass('bjc-hide');
      errorTip.html(data);
    }
  };
  BjcPlayer.prototype.renderPlayList = function (data, swfid) {
    var me = this;
    var str = [];
    var dom = me.dom;
    for (var i = 0, item; item = data[i++];) {
      item.className = '';
      if (item.video_id == me.curVid) {
        item.className = 'active';
      }
      str.push(render(playback_playList_html, item));
    }
    dom.find('.bjc-list-content-wrapper').html(str.join(''));
    dom.find('.bjc-list-content-item').click(function () {
      var ele = $(this);
      dom.find('.bjc-list-content-item').removeClass('active');
      ele.addClass('active');
      me.playListClickHandler(ele.attr('vurl'), ele.attr('vid'));
    });
  };
  BjcPlayer.prototype.playListClickHandler = function (url, vid) {
    var me = this;
    me.swfStopPlay();
    me.getPlayData(url + '&render=jsonp', me.getListVideoInfoCallback);
  };
  BjcPlayer.prototype.swfStopPlay = function () {
    var me = this;
    excuteInterface(me.swfElement, 'stopPlay');
  };
  BjcPlayer.prototype.getListVideoInfoCallback = function (json) {
    var me = this;
    me.tryBeginPlay();
  };
  BjcPlayer.prototype.startPlayByData = function (player, json) {
    var me = this;
    var param = me.param;
    if (param && param.customPlayerLogo) {
      json.data.custom_player_logo = param.customPlayerLogo;
    }
    if (param && param.customHourseLamp) {
      json.data.hourse_lamp = param.customHourseLamp;
    }
    if (param && param.customData) {
      $.extend(true, json.data, param.customData);
    }
    var uuid = getUuid();
    json.data.uuid = uuid;
    me.curVid = json.data.video_id;
    excuteInterface(player, 'startPlayByData', json);
  };
  BjcPlayer.prototype.seek = function (time) {
    var me = this;
    excuteInterface(me.swfElement, 'seek', { time: time });
  };
  BjcPlayer.prototype.pause = function () {
    var me = this;
    excuteInterface(me.swfElement, 'pause');
  };
  BjcPlayer.prototype.resume = function () {
    var me = this;
    excuteInterface(me.swfElement, 'resume');
  };
  BjcPlayer.prototype.getCurrentTime = function () {
    var me = this;
    return me.currentTime;
  };
  function excuteInterface(swfElement, action, data) {
    var param = { action: action };
    if (data) {
      param.data = data;
    }
    swfElement.excuteInterface && swfElement.excuteInterface(encodeURIComponent(JSON.stringify(param)));
  }
  function advertFactory(dom, adValues, callback, videoInfo) {
    return new Advert(dom, {
      id: adValues.adId,
      jumpUrl: adValues.clickJumpUrl,
      imgUrl: adValues.imgUrl,
      showTimer: adValues.showTimer,
      duration: adValues.duration,
      width: adValues.width,
      height: adValues.height,
      canSkip: adValues.skipAd,
      canSkipSeconds: adValues.skipAdSeconds,
      onfinish: callback,
      videoInfo: videoInfo
    });
  }
  function bjcPlayerStatisticReport(data) {
    var uuid = getUuid();
    var webData = {
      clientype: 5,
      net: 1,
      uuid: uuid,
      browser: getBrowser(),
      version: version,
      type: 'video_vod',
      env: getEnv(),
      customstr: window.bjcCustomReportString || ''
    };
    $.extend(true, data, webData);
    log('//click.baijiayun.com/gs.gif', data);
  }
  window.bjcPlayer = BjcPlayer;
  window.bjcPlayerStatisticReport = function (data) {
    data.type = 'video_vod';
    statisticReport(data);
  };
  return exports;
}(playback_player);
}());