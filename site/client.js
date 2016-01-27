(function (console, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var byte__$ByteData_ByteData_$Impl_$ = {};
byte__$ByteData_ByteData_$Impl_$.__name__ = true;
byte__$ByteData_ByteData_$Impl_$.get_length = function(this1) {
	return this1.length;
};
byte__$ByteData_ByteData_$Impl_$.readByte = function(this1,i) {
	return this1.b[i];
};
byte__$ByteData_ByteData_$Impl_$._new = function(data) {
	return data;
};
byte__$ByteData_ByteData_$Impl_$.ofString = function(s) {
	var data = haxe_io_Bytes.ofString(s);
	return data;
};
byte__$ByteData_ByteData_$Impl_$.readString = function(this1,pos,len) {
	return this1.getString(pos,len);
};
var client_DiceToken = { __ename__ : true, __constructs__ : ["TRoll","TOperation","TNumber","TPLeft","TPRight","TEoF"] };
client_DiceToken.TRoll = function(left,right) { var $x = ["TRoll",0,left,right]; $x.__enum__ = client_DiceToken; $x.toString = $estr; return $x; };
client_DiceToken.TOperation = function(op) { var $x = ["TOperation",1,op]; $x.__enum__ = client_DiceToken; $x.toString = $estr; return $x; };
client_DiceToken.TNumber = function(n) { var $x = ["TNumber",2,n]; $x.__enum__ = client_DiceToken; $x.toString = $estr; return $x; };
client_DiceToken.TPLeft = ["TPLeft",3];
client_DiceToken.TPLeft.toString = $estr;
client_DiceToken.TPLeft.__enum__ = client_DiceToken;
client_DiceToken.TPRight = ["TPRight",4];
client_DiceToken.TPRight.toString = $estr;
client_DiceToken.TPRight.__enum__ = client_DiceToken;
client_DiceToken.TEoF = ["TEoF",5];
client_DiceToken.TEoF.toString = $estr;
client_DiceToken.TEoF.__enum__ = client_DiceToken;
var client_Op = { __ename__ : true, __constructs__ : ["plus","minus","multiply","divide"] };
client_Op.plus = ["plus",0];
client_Op.plus.toString = $estr;
client_Op.plus.__enum__ = client_Op;
client_Op.minus = ["minus",1];
client_Op.minus.toString = $estr;
client_Op.minus.__enum__ = client_Op;
client_Op.multiply = ["multiply",2];
client_Op.multiply.toString = $estr;
client_Op.multiply.__enum__ = client_Op;
client_Op.divide = ["divide",3];
client_Op.divide.toString = $estr;
client_Op.divide.__enum__ = client_Op;
var hxparse_Lexer = function(input,sourceName) {
	if(sourceName == null) sourceName = "<null>";
	this.current = "";
	this.input = input;
	this.source = sourceName;
	this.pos = 0;
};
hxparse_Lexer.__name__ = true;
hxparse_Lexer.buildRuleset = function(rules,name) {
	if(name == null) name = "";
	var cases = [];
	var functions = [];
	var eofFunction = null;
	var _g = 0;
	while(_g < rules.length) {
		var rule = rules[_g];
		++_g;
		if(rule.rule == "") eofFunction = rule.func; else {
			cases.push(hxparse_LexEngine.parse(rule.rule));
			functions.push(rule.func);
		}
	}
	return new hxparse_Ruleset(new hxparse_LexEngine(cases).firstState(),functions,eofFunction,name);
};
hxparse_Lexer.prototype = {
	curPos: function() {
		return new hxparse_Position(this.source,this.pos - this.current.length,this.pos);
	}
	,token: function(ruleset) {
		if(this.pos == this.input.length) {
			if(ruleset.eofFunction != null) return ruleset.eofFunction(this); else throw new js__$Boot_HaxeError(new haxe_io_Eof());
		}
		var state = ruleset.state;
		var lastMatch = null;
		var lastMatchPos = this.pos;
		var start = this.pos;
		while(true) {
			if(state["final"] > -1) {
				lastMatch = state;
				lastMatchPos = this.pos;
			}
			if(this.pos == this.input.length) break;
			var i = this.input.b[this.pos];
			++this.pos;
			state = state.trans[i];
			if(state == null) break;
		}
		this.pos = lastMatchPos;
		this.current = this.input.getString(start,this.pos - start);
		if(lastMatch == null || lastMatch["final"] == -1) throw new js__$Boot_HaxeError(new hxparse_UnexpectedChar(String.fromCharCode(this.input.b[this.pos]),new hxparse_Position(this.source,this.pos - this.current.length,this.pos)));
		return ruleset.functions[lastMatch["final"]](this);
	}
	,__class__: hxparse_Lexer
};
var hxparse_RuleBuilder = function() { };
hxparse_RuleBuilder.__name__ = true;
var hxparse_LexEngine = function(patterns) {
	this.nodes = [];
	this.finals = [];
	this.states = [];
	this.hstates = new haxe_ds_StringMap();
	this.uid = 0;
	var pid = 0;
	var _g = 0;
	while(_g < patterns.length) {
		var p = patterns[_g];
		++_g;
		var id = pid++;
		var f = new hxparse__$LexEngine_Node(this.uid++,id);
		var n = this.initNode(p,f,id);
		this.nodes.push(n);
		this.finals.push(f);
	}
	this.makeState(this.addNodes([],this.nodes));
};
hxparse_LexEngine.__name__ = true;
hxparse_LexEngine.single = function(c) {
	return [{ min : c, max : c}];
};
hxparse_LexEngine.parse = function(pattern) {
	var p = hxparse_LexEngine.parseInner((function($this) {
		var $r;
		var data = haxe_io_Bytes.ofString(pattern);
		$r = data;
		return $r;
	}(this)));
	if(p == null) throw new js__$Boot_HaxeError("Invalid pattern '" + pattern + "'");
	return p.pattern;
};
hxparse_LexEngine.next = function(a,b) {
	if(a == hxparse__$LexEngine_Pattern.Empty) return b; else return hxparse__$LexEngine_Pattern.Next(a,b);
};
hxparse_LexEngine.plus = function(r) {
	switch(r[1]) {
	case 4:
		var r2 = r[3];
		var r1 = r[2];
		return hxparse__$LexEngine_Pattern.Next(r1,hxparse_LexEngine.plus(r2));
	default:
		return hxparse__$LexEngine_Pattern.Plus(r);
	}
};
hxparse_LexEngine.star = function(r) {
	switch(r[1]) {
	case 4:
		var r2 = r[3];
		var r1 = r[2];
		return hxparse__$LexEngine_Pattern.Next(r1,hxparse_LexEngine.star(r2));
	default:
		return hxparse__$LexEngine_Pattern.Star(r);
	}
};
hxparse_LexEngine.opt = function(r) {
	switch(r[1]) {
	case 4:
		var r2 = r[3];
		var r1 = r[2];
		return hxparse__$LexEngine_Pattern.Next(r1,hxparse_LexEngine.opt(r2));
	default:
		return hxparse__$LexEngine_Pattern.Choice(r,hxparse__$LexEngine_Pattern.Empty);
	}
};
hxparse_LexEngine.cinter = function(c1,c2) {
	return hxparse_LexEngine.ccomplement(hxparse_LexEngine.cunion(hxparse_LexEngine.ccomplement(c1),hxparse_LexEngine.ccomplement(c2)));
};
hxparse_LexEngine.cdiff = function(c1,c2) {
	return hxparse_LexEngine.ccomplement(hxparse_LexEngine.cunion(hxparse_LexEngine.ccomplement(c1),c2));
};
hxparse_LexEngine.ccomplement = function(c) {
	var first = c[0];
	var start;
	if(first != null && first.min == -1) start = c.shift().max + 1; else start = -1;
	var out = [];
	var _g = 0;
	while(_g < c.length) {
		var k = c[_g];
		++_g;
		out.push({ min : start, max : k.min - 1});
		start = k.max + 1;
	}
	if(start <= 255) out.push({ min : start, max : 255});
	return out;
};
hxparse_LexEngine.cunion = function(ca,cb) {
	var i = 0;
	var j = 0;
	var out = [];
	var a = ca[i++];
	var b = cb[j++];
	while(true) {
		if(a == null) {
			out.push(b);
			while(j < cb.length) out.push(cb[j++]);
			break;
		}
		if(b == null) {
			out.push(a);
			while(i < ca.length) out.push(ca[i++]);
			break;
		}
		if(a.min <= b.min) {
			if(a.max + 1 < b.min) {
				out.push(a);
				a = ca[i++];
			} else if(a.max < b.max) {
				b = { min : a.min, max : b.max};
				a = ca[i++];
			} else b = cb[j++];
		} else {
			var tmp = ca;
			ca = cb;
			cb = tmp;
			var tmp1 = j;
			j = i;
			i = tmp1;
			var tmp2 = a;
			a = b;
			b = tmp2;
		}
	}
	return out;
};
hxparse_LexEngine.parseInner = function(pattern,i,pDepth) {
	if(pDepth == null) pDepth = 0;
	if(i == null) i = 0;
	var r = hxparse__$LexEngine_Pattern.Empty;
	var l = pattern.length;
	while(i < l) {
		var c;
		var i1 = i++;
		c = pattern.b[i1];
		if(c > 255) throw new js__$Boot_HaxeError(c);
		switch(c) {
		case 43:
			if(r != hxparse__$LexEngine_Pattern.Empty) r = hxparse_LexEngine.plus(r); else r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
			break;
		case 42:
			if(r != hxparse__$LexEngine_Pattern.Empty) r = hxparse_LexEngine.star(r); else r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
			break;
		case 63:
			if(r != hxparse__$LexEngine_Pattern.Empty) r = hxparse_LexEngine.opt(r); else r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
			break;
		case 124:
			if(r != hxparse__$LexEngine_Pattern.Empty) {
				var r2 = hxparse_LexEngine.parseInner(pattern,i);
				return { pattern : hxparse__$LexEngine_Pattern.Choice(r,r2.pattern), pos : r2.pos};
			} else r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
			break;
		case 46:
			r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match(hxparse_LexEngine.ALL_CHARS));
			break;
		case 40:
			var r21 = hxparse_LexEngine.parseInner(pattern,i,pDepth + 1);
			i = r21.pos;
			r = hxparse_LexEngine.next(r,r21.pattern);
			break;
		case 41:
			if(r == hxparse__$LexEngine_Pattern.Empty) throw new js__$Boot_HaxeError("Empty group");
			return { pattern : hxparse__$LexEngine_Pattern.Group(r), pos : i};
		case 91:
			if(pattern.length > 1) {
				var range = 0;
				var acc = [];
				var not = pattern.b[i] == 94;
				if(not) i++;
				while(true) {
					var c1;
					var i2 = i++;
					c1 = pattern.b[i2];
					if(c1 == 93) {
						if(range != 0) return null;
						break;
					} else if(c1 == 45) {
						if(range != 0) return null;
						var last = acc.pop();
						if(last == null) acc.push({ min : c1, max : c1}); else {
							if(last.min != last.max) return null;
							range = last.min;
						}
					} else {
						if(c1 == 92) {
							var i3 = i++;
							c1 = pattern.b[i3];
						}
						if(range == 0) acc.push({ min : c1, max : c1}); else {
							acc.push({ min : range, max : c1});
							range = 0;
						}
					}
				}
				var g = [];
				var _g = 0;
				while(_g < acc.length) {
					var k = acc[_g];
					++_g;
					g = hxparse_LexEngine.cunion(g,[k]);
				}
				if(not) g = hxparse_LexEngine.cdiff(hxparse_LexEngine.ALL_CHARS,g);
				r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match(g));
			} else r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
			break;
		case 92:
			var i4 = i++;
			c = pattern.b[i4];
			if(c != c) c = 92; else if(c >= 48 && c <= 57) {
				var v = c - 48;
				while(true) {
					var cNext = pattern.b[i];
					if(cNext >= 48 && cNext <= 57) {
						v = v * 10 + (cNext - 48);
						++i;
					} else break;
				}
				c = v;
			}
			r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
			break;
		default:
			r = hxparse_LexEngine.next(r,hxparse__$LexEngine_Pattern.Match([{ min : c, max : c}]));
		}
	}
	if(pDepth != 0) throw new js__$Boot_HaxeError("Found unclosed parenthesis while parsing \"" + Std.string(pattern) + "\"");
	return { pattern : r, pos : i};
};
hxparse_LexEngine.prototype = {
	firstState: function() {
		return this.states[0];
	}
	,makeState: function(nodes) {
		var _g = this;
		var buf_b = "";
		var _g4 = 0;
		while(_g4 < nodes.length) {
			var n1 = nodes[_g4];
			++_g4;
			if(n1.id == null) buf_b += "null"; else buf_b += "" + n1.id;
			buf_b += "-";
		}
		var key = buf_b;
		var s = this.hstates.get(key);
		if(s != null) return s;
		s = new hxparse_State();
		this.states.push(s);
		this.hstates.set(key,s);
		var trans = this.getTransitions(nodes);
		var _g5 = 0;
		while(_g5 < trans.length) {
			var t = trans[_g5];
			++_g5;
			var target = this.makeState(t.n);
			var _g11 = 0;
			var _g21 = t.chars;
			while(_g11 < _g21.length) {
				var chr = _g21[_g11];
				++_g11;
				var _g41 = chr.min;
				var _g31 = chr.max + 1;
				while(_g41 < _g31) {
					var i = _g41++;
					s.trans[i] = target;
				}
			}
		}
		var setFinal = function() {
			var _g1 = 0;
			var _g2 = _g.finals;
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				var _g3 = 0;
				while(_g3 < nodes.length) {
					var n = nodes[_g3];
					++_g3;
					if(n == f) {
						s["final"] = n.pid;
						return;
					}
				}
			}
		};
		if(s["final"] == -1) setFinal();
		return s;
	}
	,getTransitions: function(nodes) {
		var tl = [];
		var _g = 0;
		while(_g < nodes.length) {
			var n = nodes[_g];
			++_g;
			var _g1 = 0;
			var _g2 = n.trans;
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				tl.push(t);
			}
		}
		tl.sort(function(t1,t2) {
			return t1.n.id - t2.n.id;
		});
		var t0 = tl[0];
		var _g11 = 1;
		var _g3 = tl.length;
		while(_g11 < _g3) {
			var i = _g11++;
			var t11 = tl[i];
			if(t0.n == t11.n) {
				tl[i - 1] = null;
				t11 = { chars : hxparse_LexEngine.cunion(t0.chars,t11.chars), n : t11.n};
				tl[i] = t11;
			}
			t0 = t11;
		}
		while(HxOverrides.remove(tl,null)) {
		}
		var allChars = hxparse_LexEngine.EMPTY;
		var allStates = new List();
		var _g4 = 0;
		while(_g4 < tl.length) {
			var t3 = tl[_g4];
			++_g4;
			var states1 = new List();
			states1.push({ chars : hxparse_LexEngine.cdiff(t3.chars,allChars), n : [t3.n]});
			var _g1_head = allStates.h;
			var _g1_val = null;
			while(_g1_head != null) {
				var s;
				s = (function($this) {
					var $r;
					_g1_val = _g1_head[0];
					_g1_head = _g1_head[1];
					$r = _g1_val;
					return $r;
				}(this));
				var nodes1 = s.n.slice();
				nodes1.push(t3.n);
				states1.push({ chars : hxparse_LexEngine.cinter(s.chars,t3.chars), n : nodes1});
				states1.push({ chars : hxparse_LexEngine.cdiff(s.chars,t3.chars), n : s.n});
			}
			var _g1_head1 = states1.h;
			var _g1_val1 = null;
			while(_g1_head1 != null) {
				var s1;
				s1 = (function($this) {
					var $r;
					_g1_val1 = _g1_head1[0];
					_g1_head1 = _g1_head1[1];
					$r = _g1_val1;
					return $r;
				}(this));
				if(s1.chars.length == 0) states1.remove(s1);
			}
			allChars = hxparse_LexEngine.cunion(allChars,t3.chars);
			allStates = states1;
		}
		var states = [];
		var _g_head = allStates.h;
		var _g_val = null;
		while(_g_head != null) {
			var s2;
			s2 = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			states.push({ chars : s2.chars, n : this.addNodes([],s2.n)});
		}
		states.sort(function(s11,s21) {
			var a = s11.chars.length;
			var b = s21.chars.length;
			var _g12 = 0;
			var _g5;
			if(a < b) _g5 = a; else _g5 = b;
			while(_g12 < _g5) {
				var i1 = _g12++;
				var a1 = s11.chars[i1];
				var b1 = s21.chars[i1];
				if(a1.min != b1.min) return b1.min - a1.min;
				if(a1.max != b1.max) return b1.max - a1.max;
			}
			if(a < b) return b - a;
			return 0;
		});
		return states;
	}
	,addNode: function(nodes,n) {
		var _g = 0;
		while(_g < nodes.length) {
			var n2 = nodes[_g];
			++_g;
			if(n == n2) return;
		}
		nodes.push(n);
		this.addNodes(nodes,n.epsilon);
	}
	,addNodes: function(nodes,add) {
		var _g = 0;
		while(_g < add.length) {
			var n = add[_g];
			++_g;
			this.addNode(nodes,n);
		}
		return nodes;
	}
	,node: function(pid) {
		return new hxparse__$LexEngine_Node(this.uid++,pid);
	}
	,initNode: function(p,$final,pid) {
		switch(p[1]) {
		case 0:
			return $final;
		case 1:
			var c = p[2];
			var n = new hxparse__$LexEngine_Node(this.uid++,pid);
			n.trans.push({ chars : c, n : $final});
			return n;
		case 2:
			var p1 = p[2];
			var n1 = new hxparse__$LexEngine_Node(this.uid++,pid);
			var an = this.initNode(p1,n1,pid);
			n1.epsilon.push(an);
			n1.epsilon.push($final);
			return n1;
		case 3:
			var p2 = p[2];
			var n2 = new hxparse__$LexEngine_Node(this.uid++,pid);
			var an1 = this.initNode(p2,n2,pid);
			n2.epsilon.push(an1);
			n2.epsilon.push($final);
			return an1;
		case 4:
			var b = p[3];
			var a = p[2];
			return this.initNode(a,this.initNode(b,$final,pid),pid);
		case 5:
			var b1 = p[3];
			var a1 = p[2];
			var n3 = new hxparse__$LexEngine_Node(this.uid++,pid);
			n3.epsilon.push(this.initNode(a1,$final,pid));
			n3.epsilon.push(this.initNode(b1,$final,pid));
			return n3;
		case 6:
			var p3 = p[2];
			return this.initNode(p3,$final,pid);
		}
	}
	,__class__: hxparse_LexEngine
};
var hxparse__$LexEngine_Pattern = { __ename__ : true, __constructs__ : ["Empty","Match","Star","Plus","Next","Choice","Group"] };
hxparse__$LexEngine_Pattern.Empty = ["Empty",0];
hxparse__$LexEngine_Pattern.Empty.toString = $estr;
hxparse__$LexEngine_Pattern.Empty.__enum__ = hxparse__$LexEngine_Pattern;
hxparse__$LexEngine_Pattern.Match = function(c) { var $x = ["Match",1,c]; $x.__enum__ = hxparse__$LexEngine_Pattern; $x.toString = $estr; return $x; };
hxparse__$LexEngine_Pattern.Star = function(p) { var $x = ["Star",2,p]; $x.__enum__ = hxparse__$LexEngine_Pattern; $x.toString = $estr; return $x; };
hxparse__$LexEngine_Pattern.Plus = function(p) { var $x = ["Plus",3,p]; $x.__enum__ = hxparse__$LexEngine_Pattern; $x.toString = $estr; return $x; };
hxparse__$LexEngine_Pattern.Next = function(p1,p2) { var $x = ["Next",4,p1,p2]; $x.__enum__ = hxparse__$LexEngine_Pattern; $x.toString = $estr; return $x; };
hxparse__$LexEngine_Pattern.Choice = function(p1,p2) { var $x = ["Choice",5,p1,p2]; $x.__enum__ = hxparse__$LexEngine_Pattern; $x.toString = $estr; return $x; };
hxparse__$LexEngine_Pattern.Group = function(p) { var $x = ["Group",6,p]; $x.__enum__ = hxparse__$LexEngine_Pattern; $x.toString = $estr; return $x; };
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var hxparse__$LexEngine_Node = function(id,pid) {
	this.id = id;
	this.pid = pid;
	this.trans = [];
	this.epsilon = [];
};
hxparse__$LexEngine_Node.__name__ = true;
hxparse__$LexEngine_Node.prototype = {
	__class__: hxparse__$LexEngine_Node
};
var hxparse_Ruleset = function(state,functions,eofFunction,name) {
	if(name == null) name = "";
	this.state = state;
	this.functions = functions;
	this.eofFunction = eofFunction;
	this.name = name;
};
hxparse_Ruleset.__name__ = true;
hxparse_Ruleset.prototype = {
	__class__: hxparse_Ruleset
};
var client_DiceLexer = function(input,sourceName) {
	hxparse_Lexer.call(this,input,sourceName);
};
client_DiceLexer.__name__ = true;
client_DiceLexer.__interfaces__ = [hxparse_RuleBuilder];
client_DiceLexer.strToRoll = function(str) {
	var regex = new EReg("([1-9][0-9]*)d([1-9][0-9]*)","");
	regex.match(str);
	return client_DiceToken.TRoll(Std.parseInt(regex.matched(1)),Std.parseInt(regex.matched(2)));
};
client_DiceLexer.__super__ = hxparse_Lexer;
client_DiceLexer.prototype = $extend(hxparse_Lexer.prototype,{
	__class__: client_DiceLexer
});
var hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken = function(stream) {
	this.stream = stream;
};
hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken.__name__ = true;
hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken.prototype = {
	peek: function(n) {
		if(this.token == null) {
			this.token = new haxe_ds_GenericCell(this.stream.token(),null);
			n--;
		}
		var tok = this.token;
		while(n > 0) {
			if(tok.next == null) tok.next = new haxe_ds_GenericCell(this.stream.token(),null);
			tok = tok.next;
			n--;
		}
		return tok.elt;
	}
	,junk: function() {
		this.last = this.token.elt;
		this.token = this.token.next;
	}
	,curPos: function() {
		return this.stream.curPos();
	}
	,parseSeparated: function(separatorFunc,f) {
		var acc = [];
		while(true) {
			try {
				acc.push(f());
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,hxparse_NoMatch) ) {
					break;
				} else throw(e);
			}
			if(separatorFunc(this.peek(0))) {
				this.last = this.token.elt;
				this.token = this.token.next;
			} else break;
		}
		return acc;
	}
	,parseOptional: function(f) {
		try {
			return f();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hxparse_NoMatch) ) {
				return null;
			} else throw(e);
		}
	}
	,parseRepeat: function(f) {
		var acc = [];
		while(true) try {
			acc.push(f());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hxparse_NoMatch) ) {
				return acc;
			} else throw(e);
		}
	}
	,parseExpect: function(f) {
		try {
			return f();
		} catch( _ ) {
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
			if( js_Boot.__instanceof(_,hxparse_NoMatch) ) {
				throw new js__$Boot_HaxeError(new hxparse_Unexpected(this.peek(0),this.stream.curPos()));
			} else throw(_);
		}
	}
	,noMatch: function() {
		return new hxparse_NoMatch(this.stream.curPos(),this.peek(0));
	}
	,unexpected: function() {
		throw new js__$Boot_HaxeError(new hxparse_Unexpected(this.peek(0),this.stream.curPos()));
	}
	,__class__: hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken
};
var hxparse_ParserBuilder = function() { };
hxparse_ParserBuilder.__name__ = true;
var client_DiceParser = function(input) {
	this.evalStackSize = 0;
	this.rolls = new haxe_ds_IntMap();
	this.shuntStack = new haxe_ds_GenericStack();
	this.evalStack = new haxe_ds_GenericStack();
	var lexer = new client_DiceLexer(input);
	var ts = new hxparse_LexerTokenSource(lexer,client_DiceLexer.tok);
	hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken.call(this,ts);
};
client_DiceParser.__name__ = true;
client_DiceParser.__interfaces__ = [hxparse_ParserBuilder];
client_DiceParser.__super__ = hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken;
client_DiceParser.prototype = $extend(hxparse_Parser_$hxparse_$LexerTokenSource_$client_$DiceToken_$client_$DiceToken.prototype,{
	parse: function() {
		while(this.parse_next()) {
		}
		while(!(this.shuntStack.head == null)) this.pushToEval(this.shuntStack.pop());
		if(this.evalStackSize > 1) throw new js__$Boot_HaxeError(2);
		return this.evalStack.pop();
	}
	,parse_next: function() {
		{
			var _g = this.peek(0);
			switch(_g[1]) {
			case 0:
				var r = _g[3];
				var l = _g[2];
				this.last = this.token.elt;
				this.token = this.token.next;
				this.pushToEval(this.last);
				return true;
			case 2:
				var n = _g[2];
				this.last = this.token.elt;
				this.token = this.token.next;
				this.pushToEval(this.last);
				return true;
			case 1:
				var op1 = _g[2];
				this.last = this.token.elt;
				this.token = this.token.next;
				try {
					while(!(this.shuntStack.head == null)) {
						var _g1 = this.shuntStack.first();
						if(_g1 != null) switch(_g1[1]) {
						case 1:
							var op2 = _g1[2];
							if(this.precendence_of(op1) <= this.precendence_of(op2)) this.pushToEval(this.shuntStack.pop()); else throw "__break__";
							break;
						default:
							throw "__break__";
						} else throw "__break__";
					}
				} catch( e ) { if( e != "__break__" ) throw e; }
				this.shuntStack.add(this.last);
				return true;
			case 3:
				this.last = this.token.elt;
				this.token = this.token.next;
				this.shuntStack.add(this.last);
				return true;
			case 4:
				this.last = this.token.elt;
				this.token = this.token.next;
				while(this.shuntStack.first() != client_DiceToken.TPLeft) {
					this.pushToEval(this.shuntStack.pop());
					if(this.shuntStack.head == null) {
						console.log("mismatch while parsing right paren");
						throw new js__$Boot_HaxeError(0);
					}
				}
				if(this.shuntStack.pop() == null) throw new js__$Boot_HaxeError(0);
				return true;
			case 5:
				this.last = this.token.elt;
				this.token = this.token.next;
				return false;
			}
		}
	}
	,precendence_of: function(op) {
		switch(op[1]) {
		case 0:case 1:
			return 1;
		case 2:case 3:
			return 2;
		}
	}
	,pushToEval: function(token) {
		switch(token[1]) {
		case 2:
			var n = token[2];
			this.evalStack.add(n);
			this.evalStackSize++;
			break;
		case 0:
			var right = token[3];
			var left = token[2];
			var dice_result = 0;
			var _g = 0;
			while(_g < left) {
				var i = _g++;
				var res = Math.floor(Math.random() * right) + 1;
				if(this.rolls.h.hasOwnProperty(right)) this.rolls.h[right].push(res); else this.rolls.h[right] = [res];
				dice_result += res;
			}
			this.evalStack.add(dice_result);
			this.evalStackSize++;
			break;
		case 1:
			var op = token[2];
			if(this.evalStackSize < 2) throw new js__$Boot_HaxeError(1);
			switch(op[1]) {
			case 0:
				this.evalStack.add(this.evalStack.pop() + this.evalStack.pop());
				this.evalStackSize--;
				break;
			case 1:
				var rhs = this.evalStack.pop();
				var lhs = this.evalStack.pop();
				this.evalStack.add(lhs - rhs);
				this.evalStackSize--;
				break;
			case 2:
				this.evalStack.add(this.evalStack.pop() * this.evalStack.pop());
				this.evalStackSize--;
				break;
			case 3:
				var rhs1 = this.evalStack.pop();
				var lhs1 = this.evalStack.pop();
				this.evalStack.add(lhs1 / rhs1);
				this.evalStackSize--;
				break;
			}
			break;
		case 5:
			throw new js__$Boot_HaxeError(3);
			break;
		case 3:case 4:
			throw new js__$Boot_HaxeError(0);
			break;
		}
	}
	,addRollResult: function(sides,result) {
		if(this.rolls.h.hasOwnProperty(sides)) this.rolls.h[sides].push(result); else this.rolls.h[sides] = [result];
	}
	,__class__: client_DiceParser
});
var client_Main = function() { };
client_Main.__name__ = true;
client_Main.main = function() {
	var doc = window.document;
	var input = window.location.pathname;
	var base_url = doc.getElementById("base").attributes.getNamedItem("href").value;
	input = HxOverrides.substr(input,base_url.length,null);
	var dice_regex = new EReg("^\\(*(\\d+d\\d+|\\d+)([+\\-*/]\\(*(\\d+d\\d+|\\d+)\\)*)*\\)*$","i");
	var input_correct = dice_regex.match(input);
	var parser = new client_DiceParser((function($this) {
		var $r;
		var data = haxe_io_Bytes.ofString(input);
		$r = data;
		return $r;
	}(this)));
	var dice_result = 0.0;
	var error_message = "Your input was incorrect, ";
	try {
		dice_result = parser.parse();
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if( js_Boot.__instanceof(e,Int) ) {
			input_correct = false;
			switch(e) {
			case 0:
				error_message += "you either forgot a bracket, or have too many.";
				break;
			case 1:
				error_message += "you may have forgotten a number or dice roll in your input.";
				break;
			case 2:case 3:
				error_message = "Something went wrong here.<br>" + ("Please tweet the url you typed in, what browser you're using and the number " + e + " to <a href=\"https://www.twitter.com/Keymaster_\">@Keymaster_</a> and I will try to fix this. Thank you!");
				break;
			}
		} else throw(e);
	}
	var div = doc.createElement("div");
	div.align = "center";
	div.innerHTML = "<h1>Result: " + dice_result + "</h1>";
	doc.body.appendChild(div);
	if(!input_correct) {
		div = doc.createElement("div");
		div.align = "center";
		div.innerHTML = error_message += "<br><br>";
		doc.body.appendChild(div);
	}
	var table = doc.createElement("table");
	table.align = "center";
	var row;
	row = js_Boot.__cast(table.insertRow() , HTMLTableRowElement);
	var cell = row.insertCell();
	cell.innerHTML = "<b>Die</b>";
	cell = row.insertCell();
	cell.innerHTML = "<b>Value</b>";
	var $it0 = parser.rolls.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		row = js_Boot.__cast(table.insertRow() , HTMLTableRowElement);
		cell = row.insertCell();
		cell.innerHTML = "" + key;
		cell = row.insertCell();
		cell.innerHTML = parser.rolls.h[key].join(", ");
	}
	doc.body.appendChild(table);
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_ds_GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe_ds_GenericCell.__name__ = true;
haxe_ds_GenericCell.prototype = {
	__class__: haxe_ds_GenericCell
};
var haxe_ds_GenericStack = function() {
};
haxe_ds_GenericStack.__name__ = true;
haxe_ds_GenericStack.prototype = {
	add: function(item) {
		this.head = new haxe_ds_GenericCell(item,this.head);
	}
	,first: function() {
		if(this.head == null) return null; else return this.head.elt;
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,__class__: haxe_ds_GenericStack
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var hxparse__$LexEngine_Transition = function(chars) {
	this.chars = chars;
};
hxparse__$LexEngine_Transition.__name__ = true;
hxparse__$LexEngine_Transition.prototype = {
	toString: function() {
		return Std.string(this.chars);
	}
	,__class__: hxparse__$LexEngine_Transition
};
var hxparse_LexerTokenSource = function(lexer,ruleset) {
	this.lexer = lexer;
	this.ruleset = ruleset;
};
hxparse_LexerTokenSource.__name__ = true;
hxparse_LexerTokenSource.prototype = {
	token: function() {
		return this.lexer.token(this.ruleset);
	}
	,curPos: function() {
		return this.lexer.curPos();
	}
	,__class__: hxparse_LexerTokenSource
};
var hxparse_ParserError = function(pos) {
	this.pos = pos;
};
hxparse_ParserError.__name__ = true;
hxparse_ParserError.prototype = {
	toString: function() {
		return "Parser error";
	}
	,__class__: hxparse_ParserError
};
var hxparse_NoMatch = function(pos,token) {
	hxparse_ParserError.call(this,pos);
	this.token = token;
};
hxparse_NoMatch.__name__ = true;
hxparse_NoMatch.__super__ = hxparse_ParserError;
hxparse_NoMatch.prototype = $extend(hxparse_ParserError.prototype,{
	toString: function() {
		return "No match: " + Std.string(this.token);
	}
	,__class__: hxparse_NoMatch
});
var hxparse_Parser = function(stream) {
	this.stream = stream;
};
hxparse_Parser.__name__ = true;
hxparse_Parser.prototype = {
	peek: function(n) {
		if(this.token == null) {
			this.token = new haxe_ds_GenericCell(this.stream.token(),null);
			n--;
		}
		var tok = this.token;
		while(n > 0) {
			if(tok.next == null) tok.next = new haxe_ds_GenericCell(this.stream.token(),null);
			tok = tok.next;
			n--;
		}
		return tok.elt;
	}
	,junk: function() {
		this.last = this.token.elt;
		this.token = this.token.next;
	}
	,curPos: function() {
		return this.stream.curPos();
	}
	,parseSeparated: function(separatorFunc,f) {
		var acc = [];
		while(true) {
			try {
				acc.push(f());
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,hxparse_NoMatch) ) {
					break;
				} else throw(e);
			}
			if(separatorFunc(this.peek(0))) {
				this.last = this.token.elt;
				this.token = this.token.next;
			} else break;
		}
		return acc;
	}
	,parseOptional: function(f) {
		try {
			return f();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hxparse_NoMatch) ) {
				return null;
			} else throw(e);
		}
	}
	,parseRepeat: function(f) {
		var acc = [];
		while(true) try {
			acc.push(f());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hxparse_NoMatch) ) {
				return acc;
			} else throw(e);
		}
	}
	,parseExpect: function(f) {
		try {
			return f();
		} catch( _ ) {
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
			if( js_Boot.__instanceof(_,hxparse_NoMatch) ) {
				throw new js__$Boot_HaxeError(new hxparse_Unexpected(this.peek(0),this.stream.curPos()));
			} else throw(_);
		}
	}
	,noMatch: function() {
		return new hxparse_NoMatch(this.stream.curPos(),this.peek(0));
	}
	,unexpected: function() {
		throw new js__$Boot_HaxeError(new hxparse_Unexpected(this.peek(0),this.stream.curPos()));
	}
	,__class__: hxparse_Parser
};
var hxparse_Position = function(source,min,max) {
	this.psource = source;
	this.pmin = min;
	this.pmax = max;
};
hxparse_Position.__name__ = true;
hxparse_Position.union = function(p1,p2) {
	return new hxparse_Position(p1.psource,p1.pmin < p2.pmin?p1.pmin:p2.pmin,p1.pmax > p2.pmax?p1.pmax:p2.pmax);
};
hxparse_Position.prototype = {
	toString: function() {
		return "" + this.psource + ":characters " + this.pmin + "-" + this.pmax;
	}
	,getLinePosition: function(input) {
		var lineMin = 1;
		var lineMax = 1;
		var posMin = 0;
		var posMax = 0;
		var cur = 0;
		while(cur < this.pmin) {
			if(input.b[cur] == 10) {
				lineMin++;
				posMin = cur + 1;
			}
			cur++;
		}
		lineMax = lineMin;
		posMax = posMin;
		posMin = cur - posMin;
		while(cur < this.pmax) {
			if(input.b[cur] == 10) {
				lineMax++;
				posMax = cur + 1;
			}
			cur++;
		}
		posMax = cur - posMax;
		return { lineMin : lineMin, lineMax : lineMax, posMin : posMin, posMax : posMax};
	}
	,format: function(input) {
		var linePos = this.getLinePosition(input);
		if(linePos.lineMin != linePos.lineMax) return "" + this.psource + ":lines " + linePos.lineMin + "-" + linePos.lineMax; else return "" + this.psource + ":" + linePos.lineMin + ": characters " + linePos.posMin + "-" + linePos.posMax;
	}
	,__class__: hxparse_Position
};
var hxparse_RuleBuilderImpl = function() { };
hxparse_RuleBuilderImpl.__name__ = true;
var hxparse_State = function() {
	this["final"] = -1;
	var this1;
	this1 = new Array(256);
	this.trans = this1;
};
hxparse_State.__name__ = true;
hxparse_State.prototype = {
	__class__: hxparse_State
};
var hxparse_Unexpected = function(token,pos) {
	hxparse_ParserError.call(this,pos);
	this.token = token;
};
hxparse_Unexpected.__name__ = true;
hxparse_Unexpected.__super__ = hxparse_ParserError;
hxparse_Unexpected.prototype = $extend(hxparse_ParserError.prototype,{
	toString: function() {
		return "Unexpected " + Std.string(this.token);
	}
	,__class__: hxparse_Unexpected
});
var hxparse_UnexpectedChar = function($char,pos) {
	hxparse_ParserError.call(this,pos);
	this["char"] = $char;
};
hxparse_UnexpectedChar.__name__ = true;
hxparse_UnexpectedChar.__super__ = hxparse_ParserError;
hxparse_UnexpectedChar.prototype = $extend(hxparse_ParserError.prototype,{
	toString: function() {
		return "Unexpected " + this["char"];
	}
	,__class__: hxparse_UnexpectedChar
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
hxparse_LexEngine.MAX_CODE = 255;
hxparse_LexEngine.EMPTY = [];
hxparse_LexEngine.ALL_CHARS = [{ min : 0, max : 255}];
js_Boot.__toStr = {}.toString;
client_DiceLexer.tok = hxparse_Lexer.buildRuleset([{ rule : "[1-9][0-9]*d[1-9][0-9]*", func : function(lexer) {
	return client_DiceLexer.strToRoll(lexer.current);
}},{ rule : "\\+", func : function(lexer1) {
	return client_DiceToken.TOperation(client_Op.plus);
}},{ rule : "\\-", func : function(lexer2) {
	return client_DiceToken.TOperation(client_Op.minus);
}},{ rule : "\\*", func : function(lexer3) {
	return client_DiceToken.TOperation(client_Op.multiply);
}},{ rule : "/", func : function(lexer4) {
	return client_DiceToken.TOperation(client_Op.divide);
}},{ rule : "\\(", func : function(lexer5) {
	return client_DiceToken.TPLeft;
}},{ rule : "\\)", func : function(lexer6) {
	return client_DiceToken.TPRight;
}},{ rule : "[0-9]+", func : function(lexer7) {
	return client_DiceToken.TNumber(Std.parseInt(lexer7.current));
}},{ rule : "", func : function(lexer8) {
	return client_DiceToken.TEoF;
}}],"tok");
client_DiceLexer.generatedRulesets = [client_DiceLexer.tok];
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
client_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
