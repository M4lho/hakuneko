import Connector from '../engine/Connector.mjs';
import Manga from '../engine/Manga.mjs';

export default class TuMangaOnline extends Connector {

    constructor() {
        super();
        super.id = 'tumangaonline';
        super.label = 'TuMangaOnline';
        this.tags = [ 'manga', 'spanish' ];
        this.url = 'https://tmofans.com';
        this.requestOptions.headers.set('x-referer', this.url);
    }

    async _initializeConnector() {
        await super._initializeConnector();
        await this.wait(2500);
    }

    async _getMangaFromURI(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'body script[type="application/ld+json"]');
        let id = uri.pathname + uri.search;
        let title = JSON.parse(data[0].textContent).headline;
        return new Manga(this, id, title);
    }

    async _getMangas() {
        let request = new Request('http://cdn.hakuneko.download/' + this.id + '/mangas.json', this.requestOptions);
        let response = await fetch(request);
        return await response.json();
    }

    async _getChapters(manga) {
        let script = `
            var _0x2859=['YkvDlG58w5PCpMOKLsKMTWdJwphfEsOvw7M2woDCnsKTwpPCjMOKTcOrexrDrcKAwqBVwqhHw7HDi8OAw6LCtQPCr1UBwrsX','dcOFdBsC','VCjCun3CgMKUHMK6wq8b','YX7CiMOMPQ==','UxfCplIMw7tcMsKBMhwNw6zCisKBHHtdLMKvAcO7w5zDpsKNAsOhw4PCm2tRw48Lw6A4w7XCtwzCu0bDkcKKVkrCjBQxw70fAcKiJcKUw5B5S8OVJ8Kywq9ow6bCtS/CosOaw68=','IVlNw7Nk','w4drBMO3AsOhNhfCvw==','LHcBdsKC','w4pOY2MAVWY8URVswpnCpsKiDhcwwoYQJADCisKLNAJlw6nCmgnDmGTDtsKnw6jDmhjDi0tgP8Oew5VqMwnCtkxMwrDCg8OFw7U8bsOzw6vDr8OvwrI=','GFkOwrl5','w7LDun8oeg==','LEZPw4hK','w4hnwqUOKA==','AHpOw4NN','w6Fkw6gcwpE=','QcKATEnDlg==','Y1PCvA==','VBbCuRALw6FYLA==','w7bDl3LCii8=','K0dww4pEIFk=','wr/DhsK5cA/DuTMww53DnmEsd3k=','asKWc0s=','ADbDrxk=','JT8Kw64=','SC/CkmPCpg==','csOwaMORw6E=','dcOteQ4H','a0PDkg==','Uy7Co2c=','w77DmMKTVw==','VnXDisOldg==','XVTDiMOqZQ==','ccKLNMKhLw==','L2oR','ZMKBeX7DgyHCqFXDqg==','w73Dn3TCmjM=','a8KNw4XDpiocGcOaRMKZMMKCUjJfVUrDjw==','FsKcw4vCjSs=','w6Z2RDcP','wpzChyUDYjg=','w7ZXwpcJ','fH/ClcOCAA==','WcOjNDMO','wpTCjxsVfQ==','wpvDvsKzbgI=','w6/Dk28zQg==','WiQ4YMKd','w6VPK8O/Eg==','bxrCimnCgA==','w4dOL1fCt8Oi','WAVWwqlW','Olk9esKD'];(function(_0x83fbe8,_0x37b083){var _0xb462be=function(_0x3bc219){while(--_0x3bc219){_0x83fbe8['push'](_0x83fbe8['shift']());}};_0xb462be(++_0x37b083);}(_0x2859,0x100));var _0x3302=function(_0x83fbe8,_0x37b083){_0x83fbe8=_0x83fbe8-0x0;var _0xb462be=_0x2859[_0x83fbe8];if(_0x3302['BUhwwg']===undefined){(function(){var _0x398d70;try{var _0x4552c3=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x398d70=_0x4552c3();}catch(_0xd20d7a){_0x398d70=window;}var _0x22fa2b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x398d70['atob']||(_0x398d70['atob']=function(_0x1ba942){var _0x4e5a6f=String(_0x1ba942)['replace'](/=+$/,'');for(var _0x5c2481=0x0,_0x1d0821,_0xb0b0b5,_0x551bf9=0x0,_0x44ce65='';_0xb0b0b5=_0x4e5a6f['charAt'](_0x551bf9++);~_0xb0b0b5&&(_0x1d0821=_0x5c2481%0x4?_0x1d0821*0x40+_0xb0b0b5:_0xb0b0b5,_0x5c2481++%0x4)?_0x44ce65+=String['fromCharCode'](0xff&_0x1d0821>>(-0x2*_0x5c2481&0x6)):0x0){_0xb0b0b5=_0x22fa2b['indexOf'](_0xb0b0b5);}return _0x44ce65;});}());var _0x502a37=function(_0x3861c8,_0x37b083){var _0x1b5440=[],_0x559ada=0x0,_0x1dfff4,_0x5e4b69='',_0x3c5443='';_0x3861c8=atob(_0x3861c8);for(var _0x5070d4=0x0,_0x6c6ec3=_0x3861c8['length'];_0x5070d4<_0x6c6ec3;_0x5070d4++){_0x3c5443+='%'+('00'+_0x3861c8['charCodeAt'](_0x5070d4)['toString'](0x10))['slice'](-0x2);}_0x3861c8=decodeURIComponent(_0x3c5443);for(var _0x3f43e3=0x0;_0x3f43e3<0x100;_0x3f43e3++){_0x1b5440[_0x3f43e3]=_0x3f43e3;}for(_0x3f43e3=0x0;_0x3f43e3<0x100;_0x3f43e3++){_0x559ada=(_0x559ada+_0x1b5440[_0x3f43e3]+_0x37b083['charCodeAt'](_0x3f43e3%_0x37b083['length']))%0x100;_0x1dfff4=_0x1b5440[_0x3f43e3];_0x1b5440[_0x3f43e3]=_0x1b5440[_0x559ada];_0x1b5440[_0x559ada]=_0x1dfff4;}_0x3f43e3=0x0;_0x559ada=0x0;for(var _0x365565=0x0;_0x365565<_0x3861c8['length'];_0x365565++){_0x3f43e3=(_0x3f43e3+0x1)%0x100;_0x559ada=(_0x559ada+_0x1b5440[_0x3f43e3])%0x100;_0x1dfff4=_0x1b5440[_0x3f43e3];_0x1b5440[_0x3f43e3]=_0x1b5440[_0x559ada];_0x1b5440[_0x559ada]=_0x1dfff4;_0x5e4b69+=String['fromCharCode'](_0x3861c8['charCodeAt'](_0x365565)^_0x1b5440[(_0x1b5440[_0x3f43e3]+_0x1b5440[_0x559ada])%0x100]);}return _0x5e4b69;};_0x3302['diBNcR']=_0x502a37;_0x3302['wGKYTl']={};_0x3302['BUhwwg']=!![];}var _0x28588d=_0x3302['wGKYTl'][_0x83fbe8];if(_0x28588d===undefined){if(_0x3302['xrzNyu']===undefined){_0x3302['xrzNyu']=!![];}_0xb462be=_0x3302['diBNcR'](_0xb462be,_0x37b083);_0x3302['wGKYTl'][_0x83fbe8]=_0xb462be;}else{_0xb462be=_0x28588d;}return _0xb462be;};new Promise(_0x5a50f5=>{var _0x3b03ee={};_0x3b03ee[_0x3302('0x0','[8%W')]=_0x3302('0x1','raj5');_0x3b03ee[_0x3302('0x2','QF&J')]=function(_0x59f878,_0x439d4c){return _0x59f878(_0x439d4c);};_0x3b03ee[_0x3302('0x3','6)S1')]=_0x3302('0x4',']ZUE');_0x3b03ee[_0x3302('0x5','MdOT')]=_0x3302('0x6','[8%W');_0x3b03ee[_0x3302('0x7','(X#v')]=_0x3302('0x8','r3VQ');_0x3b03ee[_0x3302('0x9','](Oz')]=_0x3302('0xa','2zmH');_0x3b03ee[_0x3302('0xb','tJqQ')]=_0x3302('0xc','yItd');_0x3b03ee[_0x3302('0xd','&6uA')]=function(_0x2e75ce,_0x4adfca){return _0x2e75ce<_0x4adfca;};_0x3b03ee[_0x3302('0xe','lo&X')]=function(_0x341705,_0x4b9f40){return _0x341705+_0x4b9f40;};_0x3b03ee[_0x3302('0xf','](Oz')]=function(_0x5d9458,_0x96a00b){return _0x5d9458+_0x96a00b;};_0x3b03ee[_0x3302('0x10','U!fX')]=function(_0x25cd97,_0xacf198,_0x4fe844){return _0x25cd97(_0xacf198,_0x4fe844);};let _0x2cf5c4={};_0x2cf5c4[_0x3b03ee[_0x3302('0x11','](Oz')]]=[..._0x3b03ee[_0x3302('0x12','4$MV')]($,_0x3b03ee[_0x3302('0x13','0L3t')])][_0x3302('0x14','(X#v')](_0x358880=>$(_0x358880)[_0x3302('0x15','r3VQ')]()[_0x3302('0x16','nYbG')]()[_0x3302('0x17','](Oz')](_0x3302('0x18','B&I$'))[_0x3302('0x19','UBaF')]('h4')[_0x3302('0x1a','lTkR')]()[_0x3302('0x1b','Hvkl')]());_0x2cf5c4[_0x3b03ee[_0x3302('0x1c','[8%W')]]=[..._0x3b03ee[_0x3302('0x1d','CV*J')]($,_0x3b03ee[_0x3302('0x1e','MdOT')])][_0x3302('0x1f',']ZUE')](_0x10d764=>_0x10d764[_0x3302('0x20','[8%W')][_0x3302('0x21','wkl[')]());_0x2cf5c4[_0x3b03ee[_0x3302('0x22','qI5)')]]=[..._0x3b03ee[_0x3302('0x23','qI5)')]($,_0x3b03ee[_0x3302('0x24','MN90')])][_0x3302('0x25','&6uA')](_0x89bf15=>_0x89bf15[_0x3302('0x26','0L3t')][_0x3302('0x27','nYbG')](new RegExp(_0x3302('0x28','vZKt')))[0x1]);let _0xb2a490=[];for(let _0x72a863=0x0;_0x3b03ee[_0x3302('0x29','emk7')](_0x72a863,_0x2cf5c4[_0x3b03ee[_0x3302('0x2a','yItd')]][_0x3302('0x2b','%X&a')]);_0x72a863++){_0xb2a490[_0x3302('0x2c','U!fX')]({'id':_0x72a863,'title':_0x3b03ee[_0x3302('0x2d','(X#v')](_0x3b03ee[_0x3302('0x2e',']8M[')](_0x3b03ee[_0x3302('0x2f','%X&a')](_0x2cf5c4[_0x3b03ee[_0x3302('0x30','B&I$')]][_0x72a863],'\x20['),_0x2cf5c4[_0x3b03ee[_0x3302('0x31','lo&X')]][_0x72a863]),']'),'language':_0x2cf5c4[_0x3b03ee[_0x3302('0x32','2sRz')]][_0x72a863]});}_0x3b03ee[_0x3302('0x33','2zmH')](setTimeout,()=>_0x5a50f5(_0xb2a490),0x9c4);});
        `;
        let request = new Request(this.url + manga.id, this.requestOptions);
        return await Engine.Request.fetchUI(request, script);
    }

    async _getChapterLink(chapter) {
        let script = `
            window['chapter'] = ${chapter.id};
            const _0x630d=['wp9VwotEFw==','XRbDnwwH','U8K3U8OBw7w=','XVrCrXrCpg==','fh7DuivCgA==','fhNoFcKI','SmPCucKVFw==','w4HDlMOBaR0=','w6nChcOvw5rClg==','GFNVwq9h','wqPDiCpVFg==','wpTCg2EgXQ==','XcOIwrbCv0E=','wp5rw5oAcg==','HsKLf8Ko','OVfCmjrCqA==','OMO8CmDCpjAPUiMpw5TDqMO+wohMasKO','ej3DjcK4wok=','wozDllvChMOq','F8KzdMKpOA==','RV7DohEewpFs','B8KvFsOofA==','w5YwwpZsw48=','K8Kwwp3Cl8ON','cTjDmiDCnA==','w7zCpsOTw77Cuw==','L03Cp05y','Pg/DlMK/Xw==','WXHDjwgO','LMKoGsObUw==','R8K6wpMLwp8=','w7s9wrF8AMKAw6wBBcKCwoA=','CcOKw57CusKu','CFPCmm1zwpHCuMOpHcOUWXg2WsOCV8Krw4rDi8Ojdi7DtVN8ago+SsOpw7TDsMKuwoJmfMOhYMOiUcKSTjd8MMOsC8OMwozDvMO4w6otBm4Fw4LDvcO+','wpjDvh56LhVE','eB/DjQo=','OMOqFSU=','XzvDicKswqY=','GMObw4nCkcKn','dGrCncKVdGQAw4ggwrg=','NcODNQrCmg==','LcOjw7LCjcKT','w5rDpy5eZkbDi8OV','OMOuOcO9wo4=','woUleRN3','w4I2wpFX','b2TCjMKzOw==','w50nM8KgwoYZGA==','LgDDusKXYg==','w6DDlcOmWBA=','woIoTRPCuQ==','w5XDvFTDisOw','c3/Cu8KYEw==','eBnDkcKFwrTDhcKAwrnDj3vCnA==','wq7Cu1wqaA==','dcKbUsOlw4oVRw==','GcOKPcKUwrrDrCphwqbDpsO0w6vDoHJ+DH8RwonCoMOYwrwBwoIBw51IwrzDgi02wr9aw6E5wqfDkMKPCUpkwojDncOvBWhNw4M=','I8OJKzrCvg==','AsOZw4nDnA==','QcKUwqElwrdXwrnCicO6','EMK+EsKbwpw='];(function(_0xb29ecb,_0x499a2b){const _0x416032=function(_0x2be8cc){while(--_0x2be8cc){_0xb29ecb['push'](_0xb29ecb['shift']());}};_0x416032(++_0x499a2b);}(_0x630d,0x67));const _0xda73=function(_0xb29ecb,_0x499a2b){_0xb29ecb=_0xb29ecb-0x0;let _0x416032=_0x630d[_0xb29ecb];if(_0xda73['GVZoCu']===undefined){(function(){const _0x2be8cc=function(){let _0x204767;try{_0x204767=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x5818f4){_0x204767=window;}return _0x204767;};const _0x4cf721=_0x2be8cc();const _0x3e5db1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4cf721['atob']||(_0x4cf721['atob']=function(_0x18284f){const _0x367527=String(_0x18284f)['replace'](/=+$/,'');let _0xbfa277='';for(let _0x50303b=0x0,_0x120094,_0x593618,_0x22b98b=0x0;_0x593618=_0x367527['charAt'](_0x22b98b++);~_0x593618&&(_0x120094=_0x50303b%0x4?_0x120094*0x40+_0x593618:_0x593618,_0x50303b++%0x4)?_0xbfa277+=String['fromCharCode'](0xff&_0x120094>>(-0x2*_0x50303b&0x6)):0x0){_0x593618=_0x3e5db1['indexOf'](_0x593618);}return _0xbfa277;});}());const _0x2ea958=function(_0x52acde,_0x499a2b){let _0x4aa890=[],_0x2b7623=0x0,_0x535877,_0x3da6c3='',_0x1d25a9='';_0x52acde=atob(_0x52acde);for(let _0x27dace=0x0,_0xc94673=_0x52acde['length'];_0x27dace<_0xc94673;_0x27dace++){_0x1d25a9+='%'+('00'+_0x52acde['charCodeAt'](_0x27dace)['toString'](0x10))['slice'](-0x2);}_0x52acde=decodeURIComponent(_0x1d25a9);let _0x120c9d;for(_0x120c9d=0x0;_0x120c9d<0x100;_0x120c9d++){_0x4aa890[_0x120c9d]=_0x120c9d;}for(_0x120c9d=0x0;_0x120c9d<0x100;_0x120c9d++){_0x2b7623=(_0x2b7623+_0x4aa890[_0x120c9d]+_0x499a2b['charCodeAt'](_0x120c9d%_0x499a2b['length']))%0x100;_0x535877=_0x4aa890[_0x120c9d];_0x4aa890[_0x120c9d]=_0x4aa890[_0x2b7623];_0x4aa890[_0x2b7623]=_0x535877;}_0x120c9d=0x0;_0x2b7623=0x0;for(let _0x2859c9=0x0;_0x2859c9<_0x52acde['length'];_0x2859c9++){_0x120c9d=(_0x120c9d+0x1)%0x100;_0x2b7623=(_0x2b7623+_0x4aa890[_0x120c9d])%0x100;_0x535877=_0x4aa890[_0x120c9d];_0x4aa890[_0x120c9d]=_0x4aa890[_0x2b7623];_0x4aa890[_0x2b7623]=_0x535877;_0x3da6c3+=String['fromCharCode'](_0x52acde['charCodeAt'](_0x2859c9)^_0x4aa890[(_0x4aa890[_0x120c9d]+_0x4aa890[_0x2b7623])%0x100]);}return _0x3da6c3;};_0xda73['GnnNDO']=_0x2ea958;_0xda73['qjruDB']={};_0xda73['GVZoCu']=!![];}const _0x43b177=_0xda73['qjruDB'][_0xb29ecb];if(_0x43b177===undefined){if(_0xda73['JfeoWc']===undefined){_0xda73['JfeoWc']=!![];}_0x416032=_0xda73['GnnNDO'](_0x416032,_0x499a2b);_0xda73['qjruDB'][_0xb29ecb]=_0x416032;}else{_0x416032=_0x43b177;}return _0x416032;};new Promise((_0x3e6aee,_0x1a5713)=>{const _0x6d11e5={};_0x6d11e5[_0xda73('0x1e','v!hm')]=function(_0x5de40a,_0x2a5c83){return _0x5de40a(_0x2a5c83);};_0x6d11e5[_0xda73('0x20','1%q%')]=_0xda73('0x11','fd!P');_0x6d11e5[_0xda73('0x14','Nz)G')]=_0xda73('0xd','6hHm');_0x6d11e5[_0xda73('0x6','d@#W')]=function(_0x1df63e,_0x30fb1f){return _0x1df63e===_0x30fb1f;};_0x6d11e5[_0xda73('0xa','DKkA')]=_0xda73('0x3','X!$g');_0x6d11e5[_0xda73('0x2f','hyo2')]=_0xda73('0x27','hyo2');_0x6d11e5[_0xda73('0x38','2xIC')]=_0xda73('0x2','uKhV');_0x6d11e5[_0xda73('0x19','DKkA')]=function(_0x56b77a,_0x2934c0){return _0x56b77a(_0x2934c0);};_0x6d11e5[_0xda73('0x4','DKkA')]=function(_0xe77b8f,_0x3d6de3){return _0xe77b8f(_0x3d6de3);};_0x6d11e5[_0xda73('0xc','v!hm')]=_0xda73('0x3a','DKkA');_0x6d11e5[_0xda73('0x2a','l]w0')]=_0xda73('0x10','LjLz');_0x6d11e5[_0xda73('0x13','hwb[')]=_0xda73('0xb','2xIC');_0x6d11e5[_0xda73('0x3b','u6@h')]=_0xda73('0x0','2V[5');_0x6d11e5[_0xda73('0x22','3P$]')]=_0xda73('0x23','u6@h');_0x6d11e5[_0xda73('0x1b','hZt5')]=_0xda73('0x34','fgnl');_0x6d11e5[_0xda73('0x2e','d@#W')]=_0xda73('0xe','GRC!');_0x6d11e5[_0xda73('0x18','8*Xa')]=_0xda73('0x5','fNWr');_0x6d11e5[_0xda73('0x25','CRDG')]=function(_0x50858f,_0x15135e){return _0x50858f(_0x15135e);};_0x6d11e5[_0xda73('0x15','6hHm')]=function(_0x4ef2b2,_0x223707,_0x6391f1){return _0x4ef2b2(_0x223707,_0x6391f1);};let _0x54d0c5=$[_0xda73('0x21','U5]5')];$[_0xda73('0x36','^qRP')]=_0x4e4468=>{const _0x27dff1={};_0x27dff1[_0xda73('0x28','KgF9')]=function(_0x19193d,_0x25c057){return _0x6d11e5.RjWsb(_0x19193d,_0x25c057);};if(_0x6d11e5[_0xda73('0x33','0B&9')](_0x4e4468[_0xda73('0x37','u6@h')][_0xda73('0x32','qdMp')](),_0x6d11e5[_0xda73('0x12','fhe(')])){_0x4e4468[_0x6d11e5[_0xda73('0xf','u6@h')]]=_0x1e9d62=>{_0x6d11e5[_0xda73('0x1a','oKZ3')](_0x3e6aee,_0x1e9d62[_0xda73('0x35','9b[!')](_0x6d11e5[_0xda73('0x30','KgF9')],_0x6d11e5[_0xda73('0x24','2xIC')]));};_0x4e4468[_0x6d11e5[_0xda73('0x3c','0B&9')]]=(_0x23928b,_0x1e9ef7,_0x14dae7)=>{_0x27dff1[_0xda73('0x1d','9b[!')](_0x1a5713,_0x14dae7);};}_0x6d11e5[_0xda73('0x9','vkba')](_0x54d0c5,_0x4e4468);};_0x6d11e5[_0xda73('0x1','GRC!')](setTimeout,()=>{try{if(_0x6d11e5[_0xda73('0x2d','fgnl')]($,_0x6d11e5[_0xda73('0x26','U5]5')])[_0x6d11e5[_0xda73('0x16','a5RF')]]()[_0x6d11e5[_0xda73('0x2b','^qRP')]]()[_0x6d11e5[_0xda73('0x1f',')B%X')]](_0x6d11e5[_0xda73('0x1c','#p51')])){_0x6d11e5[_0xda73('0x8','D6s5')](_0x1a5713,new Error(_0x6d11e5[_0xda73('0x31','fd!P')]));}else{_0x6d11e5[_0xda73('0x7','oKZ3')]($,_0x6d11e5[_0xda73('0x17','^qRP')])[window[_0x6d11e5[_0xda73('0x29','X!$g')]]][_0xda73('0x2c','hZt5')]();}}catch(_0x54084d){_0x6d11e5[_0xda73('0x39','0B&9')](_0x1a5713,_0x54084d);}},0x3e8);});
        `;
        let request = new Request(this.url + chapter.manga.id, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        return new URL(data, request.url);
    }

    async _getPages(chapter) {
        let script = `
            const _0x16c7=['M8Kow6lUaA==','SkouwrvCmw==','wqrCqMKMD8KR','wr3CusK0IsKu','UxTDnWN/U3DDp8K2w7DDriM=','d8OLw5bCqzQgBcOHY8OjAsOOd8KSw7pgw7g1SQ==','w5zDvRnDhMOR','XMKmKmZz','Z8KXwrpWw5g=','w79bZ8OzKw==','Hl/DnMK5Mg==','w7rDk3DDkcOTXA==','w4JGF8Kkw5o=','AgB/wqvCtw==','w5I4wovCtxU=','EClSwq3Dsw==','Yk1pwp9F','EBtkwp7Dkw==','eU/DtsOBw4HCmA3Dvw==','WsKew4TCg8K4','REwzwr/Cqw==','w60swrXCgik=','wrzCji0jQQ==','wplTGcOUIQ==','ewADw4sIFsKmwrJ+wq4BARQ=','woJ/KsO0Jw==','KcOhV8KOBg==','w4XChnLDoAEIwpw7w47DocKSdcKaw5xrQg==','worCkRAIXmZGPMOYwpoRTg==','f0FVw53DkQ==','wobCqQgrwos=','w4DCnE3DiMOs','wqjDmmTDsR8=','w4TDh3HDmMOa','NUbDncK8Hw==','P8O2w6nDjsKA','wod+CsO0Aw==','YwgVw4oDDA==','MsKtw6ktHw==','dMOgUcKYwrU=','OMKTMA==','w6fDgsKFwqLCvA==','wo/Dm0HCrSU=','w40iw785Nw==','EsOjw5vDo8KV','wqBkIMOTAQ==','TWF+wo97d8OgwqHCvx7CqW/DmQ==','w7pra1XCig==','AMKtVVkadBzDoMO2LsON','X2jDtcO6w7c=','XXk4ATw=','UCJEwqnCqcKUAcOsLsOWGMKWwofCgcKww5lnDAY=','w5rCsQRvw5g=','wpbCmsKiBMKswrfDkcOdwqdzwrrDhg==','w5dQQcOiLQ==','w7jDv1jDlcOP','ZsK/w4M7Ejh1wqYrLUJGV2VoeMOUw4pzwp4y','wr7DmMO8wo58','w59VdV/ClsOqC8KjMsKcGA==','w67Cv8KhAsOP','w7Qkw6MQEw==','CTVOwq7CkA==','w7lZcV/Ch8OW','w5zClWM=','VcKewpZ6w48=','DcOTw4bCrQw=','wqnDt8ONwop7','w5sMw4U=','f2cI','fCI8w6oo','w55ZwrRXesOnOcKYwqjCoMOjTsON','w5lmSMOMPg==','M8KbLhvDrk1mD1Q=','w4/Ck0HDiRU=','w6PCk33DkBc=','wq1fMcOS','w7B1cnzCoA==','w5jDu0zDlMOd','DMOew5zCgBk=','wpvDrsOzwopw','w5N5d03Csg==','WHA/wo3Cqg==','Ym0I','ecKKwrx2w4Q=','w7HCq2vDsRo=','w7/CkU/DisO0','LcKLw4YpMw==','HMK7w6kqMg==','w4t0wqlwVQ==','wpfDm8Oxwqd9','wrBCdms7','aFdpwo1Y','wq3DtjXDucOj','V8KpNEZb','w6bCvTBiw6w=','HcOsw5LDjsKu','FsKfw7xuUw==','wpXCrcKwFsKA','w5ZEIMK4w5E=','XAsXw5s8','w5HDmDbDpMOz','B8KuX0kZZSXDvQ==','LsKww61PYw==','wq1Gw5TCiRM=','wrUZe8KtwqzCkQ==','C8K3w51NVg==','eVzDq8OGw4vCpRrDuwY=','YDUmw4Ej','eVhdw47Dmg==','w77CpkbDijc=','w4tkYMOzIw==','w4vDp1jDuMO7','JMKbaVAh','wrxMKMOK','bVBawph7','D8Ohw4zDk8K5ccOlMUrCr8KDLsOFJQ==','KMOGVMKHDQ==','BMO0w4vDmcK+YMOM','Q8KTwo5Mw6M1c3DCjUhx','wrTDgcOpwo5u','bAAkw6wu','w6TDumDDtsOs','F8KPw5jDsQg=','w7jCs3DDvcOfwqjCtTDCn8Kz','woLCvhMvwpE=','w4ZoKsKnw5s=','w7jDrh8=','I8O5dcKjDg==','w7rDgmE=','w7rCiBdL','wqdTw4jCmTg=','wrjDuibDjMOG','UMOKeMKawqY=','wqzCkyA8Qg==','w48TwoTChA==','w61awqFSQQ==','dsKuLGpc','wqFIwogyw7k=','CcKEw4k7KQ==','GMOBw7PCtzI=','w4/DjT/DucOYwrJeCcOyS27DgwvCvcOvwoHCs2M7woNV','woBYwq5Df8O2NA==','w7PCixdAw5vCqx9oEFHDsXY=','w4PChWHDucOr','RHFNwpRd','STjCmsOm','wojCtcK0DcKL','QsK4w7A=','ElfCn0Un','w5bDgMKnwoHCsQ==','aTTDmUZk','w75maA==','wrbDl1TDlA8=','worCpD4wwo8=','w6HDp2vDvcOQ','w7zCmMKFGcOM','w6nCnsKtM8OGw5BXAzg=','w7vCpFjDliI9woEKw6jDmMK5HMO9w69LaMKkwpfCq8OndcO5wovCsR1MwpfDh29zTsOtw7PDpA/CiyhwXMOdJg==','w4DCmMKjCsOq','NsOQw5LCsDxhCcOfVA==','w5F1L8K8w58=','w65FwrZITQ==','w61ZD8Kjw64=','woQRcsKjwq8=','w6fCjhBBw5rCqA==','w6nCgA98w7c=','KcKUw4pkUg=='];(function(_0x43c1b4,_0x21c10c){const _0x38f4c5=function(_0x471e19){while(--_0x471e19){_0x43c1b4['push'](_0x43c1b4['shift']());}};_0x38f4c5(++_0x21c10c);}(_0x16c7,0xb6));const _0x2098=function(_0x43c1b4,_0x21c10c){_0x43c1b4=_0x43c1b4-0x0;let _0x38f4c5=_0x16c7[_0x43c1b4];if(_0x2098['EVMaso']===undefined){(function(){const _0x471e19=function(){let _0x1ccd91;try{_0x1ccd91=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x512d65){_0x1ccd91=window;}return _0x1ccd91;};const _0x48d764=_0x471e19();const _0x41b1b4='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x48d764['atob']||(_0x48d764['atob']=function(_0x44f4fc){const _0x449d4b=String(_0x44f4fc)['replace'](/=+$/,'');let _0x41cf0a='';for(let _0x3e1361=0x0,_0x3cb70c,_0x4874e2,_0x4a6e8e=0x0;_0x4874e2=_0x449d4b['charAt'](_0x4a6e8e++);~_0x4874e2&&(_0x3cb70c=_0x3e1361%0x4?_0x3cb70c*0x40+_0x4874e2:_0x4874e2,_0x3e1361++%0x4)?_0x41cf0a+=String['fromCharCode'](0xff&_0x3cb70c>>(-0x2*_0x3e1361&0x6)):0x0){_0x4874e2=_0x41b1b4['indexOf'](_0x4874e2);}return _0x41cf0a;});}());const _0x3901fa=function(_0x574ade,_0x21c10c){let _0x5d3bb3=[],_0x324499=0x0,_0x535505,_0x25a242='',_0x1e62a7='';_0x574ade=atob(_0x574ade);for(let _0x1a17f3=0x0,_0x57ed1e=_0x574ade['length'];_0x1a17f3<_0x57ed1e;_0x1a17f3++){_0x1e62a7+='%'+('00'+_0x574ade['charCodeAt'](_0x1a17f3)['toString'](0x10))['slice'](-0x2);}_0x574ade=decodeURIComponent(_0x1e62a7);let _0x69da50;for(_0x69da50=0x0;_0x69da50<0x100;_0x69da50++){_0x5d3bb3[_0x69da50]=_0x69da50;}for(_0x69da50=0x0;_0x69da50<0x100;_0x69da50++){_0x324499=(_0x324499+_0x5d3bb3[_0x69da50]+_0x21c10c['charCodeAt'](_0x69da50%_0x21c10c['length']))%0x100;_0x535505=_0x5d3bb3[_0x69da50];_0x5d3bb3[_0x69da50]=_0x5d3bb3[_0x324499];_0x5d3bb3[_0x324499]=_0x535505;}_0x69da50=0x0;_0x324499=0x0;for(let _0x49797e=0x0;_0x49797e<_0x574ade['length'];_0x49797e++){_0x69da50=(_0x69da50+0x1)%0x100;_0x324499=(_0x324499+_0x5d3bb3[_0x69da50])%0x100;_0x535505=_0x5d3bb3[_0x69da50];_0x5d3bb3[_0x69da50]=_0x5d3bb3[_0x324499];_0x5d3bb3[_0x324499]=_0x535505;_0x25a242+=String['fromCharCode'](_0x574ade['charCodeAt'](_0x49797e)^_0x5d3bb3[(_0x5d3bb3[_0x69da50]+_0x5d3bb3[_0x324499])%0x100]);}return _0x25a242;};_0x2098['kJJirH']=_0x3901fa;_0x2098['SfcEkz']={};_0x2098['EVMaso']=!![];}const _0x1290d2=_0x2098['SfcEkz'][_0x43c1b4];if(_0x1290d2===undefined){if(_0x2098['YkSoIu']===undefined){_0x2098['YkSoIu']=!![];}_0x38f4c5=_0x2098['kJJirH'](_0x38f4c5,_0x21c10c);_0x2098['SfcEkz'][_0x43c1b4]=_0x38f4c5;}else{_0x38f4c5=_0x1290d2;}return _0x38f4c5;};new Promise((_0x36a649,_0x1a6659)=>{const _0xefd72c={};_0xefd72c[_0x2098('0x10','cR]N')]=_0x2098('0x5e','t*Ku');_0xefd72c[_0x2098('0x92','9HkT')]=_0x2098('0xd','GsHi');_0xefd72c[_0x2098('0x3b','t*Ku')]=_0x2098('0x71','*WXc');_0xefd72c[_0x2098('0x4f','S&91')]=_0x2098('0x26','lRas');_0xefd72c[_0x2098('0xb','LAOU')]=_0x2098('0x37','9HkT');_0xefd72c[_0x2098('0x9b','lRas')]=_0x2098('0x67','mO8H');_0xefd72c[_0x2098('0x17','Ab!M')]=_0x2098('0x77','%Vi6');_0xefd72c[_0x2098('0x87','wcy%')]=function(_0x4ba50f,_0x47726d){return _0x4ba50f>_0x47726d;};_0xefd72c[_0x2098('0x99','FUpJ')]=_0x2098('0x7f','S&91');_0xefd72c[_0x2098('0x53','[UG%')]=_0x2098('0x3','@Mf@');_0xefd72c[_0x2098('0x42','FUpJ')]=function(_0x555f58,_0x4a890b){return _0x555f58>_0x4a890b;};_0xefd72c[_0x2098('0xa4','[UG%')]=_0x2098('0x21','0*0(');_0xefd72c[_0x2098('0x83','lRas')]=_0x2098('0x1f','rnl&');_0xefd72c[_0x2098('0x5a','z$VS')]=function(_0x4500ba,_0x9e0133){return _0x4500ba*_0x9e0133;};_0xefd72c[_0x2098('0x4d','Oul^')]=_0x2098('0x6c','cR]N');_0xefd72c[_0x2098('0x9f','AQ7$')]=_0x2098('0x30','Oul^');_0xefd72c[_0x2098('0x28','*WXc')]=_0x2098('0x9c','wcy%');_0xefd72c[_0x2098('0x46','cR]N')]=function(_0x23bace,_0x28306c){return _0x23bace*_0x28306c;};_0xefd72c[_0x2098('0x27','Z2lk')]=function(_0x4d5177,_0x57a383){return _0x4d5177(_0x57a383);};_0xefd72c[_0x2098('0x41','8YSu')]=_0x2098('0x66','Ai[Z');_0xefd72c[_0x2098('0xa6','%Vi6')]=_0x2098('0x82','AEKV');_0xefd72c[_0x2098('0x1e','0XJf')]=_0x2098('0x9','Ky34');_0xefd72c[_0x2098('0x58','K1aY')]=function(_0x2e2258,_0x20a33c){return _0x2e2258(_0x20a33c);};_0xefd72c[_0x2098('0x8a',']ZrM')]=function(_0x446b0f,_0x199005){return _0x446b0f!==_0x199005;};_0xefd72c[_0x2098('0x3f','i^LN')]=_0x2098('0x16','Ky34');_0xefd72c[_0x2098('0x6b','nX4H')]=function(_0x5c0244,_0x587032){return _0x5c0244(_0x587032);};_0xefd72c[_0x2098('0x97','z$VS')]=function(_0x237759,_0x5dc244){return _0x237759===_0x5dc244;};_0xefd72c[_0x2098('0x8c','lZSO')]=_0x2098('0x39','lQ4f');_0xefd72c[_0x2098('0x8','0XJf')]=_0x2098('0x7d','Oul^');_0xefd72c[_0x2098('0x60','*WXc')]=_0x2098('0x29','Ab!M');_0xefd72c[_0x2098('0x45','t*Ku')]=_0x2098('0x24','Uek@');_0xefd72c[_0x2098('0x8b','*WXc')]=_0x2098('0x9d','i^LN');_0xefd72c[_0x2098('0x63','rnl&')]=function(_0x395dde,_0x3598ac){return _0x395dde(_0x3598ac);};_0xefd72c[_0x2098('0x3d','8YSu')]=_0x2098('0x43','FUpJ');_0xefd72c[_0x2098('0x86','3q$u')]=_0x2098('0x7e','9HkT');_0xefd72c[_0x2098('0x1c','FGnT')]=_0x2098('0x59','LQm9');_0xefd72c[_0x2098('0x85','Ys%!')]=function(_0x31e22c,_0x5420e1){return _0x31e22c(_0x5420e1);};_0xefd72c[_0x2098('0x2','Cf6Y')]=_0x2098('0x19','lQ4f');_0xefd72c[_0x2098('0x91','[UG%')]=_0x2098('0x2f','8YSu');_0xefd72c[_0x2098('0x5f','Z2lk')]=_0x2098('0x64','Ai[Z');_0xefd72c[_0x2098('0xa0','mO8H')]=_0x2098('0x5b','@Mf@');_0xefd72c[_0x2098('0xa2','AEKV')]=function(_0x41bf5c,_0x3b45d1){return _0x41bf5c(_0x3b45d1);};_0xefd72c[_0x2098('0x96','S&91')]=_0x2098('0x8e','t*Ku');_0xefd72c[_0x2098('0x9e','hX*X')]=_0x2098('0x3c','0XJf');_0xefd72c[_0x2098('0xa','0XJf')]=_0x2098('0x62','0XJf');_0xefd72c[_0x2098('0x2e','Uek@')]=_0x2098('0x95','S&91');_0xefd72c[_0x2098('0x12','*WXc')]=_0x2098('0x2b','8YSu');_0xefd72c[_0x2098('0x6e','[UG%')]=_0x2098('0xc','t*Ku');_0xefd72c[_0x2098('0x15','0XJf')]=_0x2098('0x56','0*0(');_0xefd72c[_0x2098('0x78','9HkT')]=_0x2098('0xa3','*WXc');_0xefd72c[_0x2098('0x98','z$VS')]=function(_0x47c26b,_0x43d026,_0x573eff){return _0x47c26b(_0x43d026,_0x573eff);};const _0x3f1bc3={};_0x3f1bc3[_0x2098('0x34','FGnT')]=function(){return this[_0xefd72c[_0x2098('0x5','FUpJ')]]||this[_0xefd72c[_0x2098('0x32','i^LN')]](_0xefd72c[_0x2098('0x4a','EGuR')]);};_0x3f1bc3[_0x2098('0x35','FUpJ')]=function(_0x50ad3b){this[_0xefd72c[_0x2098('0x68','EGuR')]]=_0x50ad3b;this[_0xefd72c[_0x2098('0x0','Cf6Y')]](_0xefd72c[_0x2098('0x5c','Ky34')],_0x50ad3b);this[_0xefd72c[_0x2098('0x20','8YSu')]](new window[_0xefd72c[(_0x2098('0x89','cAHI'))]](_0xefd72c[_0x2098('0x4b','9@k#')]));};this[_0xefd72c[_0x2098('0x1b','fHVf')]][_0xefd72c[_0x2098('0x8f','lZSO')]](Image[_0xefd72c[_0x2098('0x81','rnl&')]],_0xefd72c[_0x2098('0x4','!92U')],_0x3f1bc3);for(let _0x30ce23 of _0xefd72c[_0x2098('0x79','AQ7$')]($,_0xefd72c[_0x2098('0x1d','Ai[Z')])){try{this[_0xefd72c[_0x2098('0x94','LQm9')]](_0x30ce23[_0xefd72c[_0x2098('0x25','S&91')]]);}finally{continue;}}this[_0xefd72c[_0x2098('0x93','[UG%')]][_0xefd72c[_0x2098('0x65','LAOU')]]=Number[_0xefd72c[_0x2098('0x3e','*WXc')]];this[_0xefd72c[_0x2098('0x9a','lRas')]][_0xefd72c[_0x2098('0x13','AEKV')]](new CustomEvent(_0xefd72c[_0x2098('0x54','Ky34')]));function _0x1e310f(_0x254068){let _0x32da0e=![];if(_0x254068){_0x32da0e=_0xefd72c[_0x2098('0x74','Oul^')](_0x254068[_0xefd72c[_0x2098('0x11','cAHI')]],this[_0xefd72c[_0x2098('0x7c','i^LN')]]('12'))&&_0xefd72c[_0x2098('0x48','Ab!M')](_0x254068[_0xefd72c[_0x2098('0x51','z$VS')]],this[_0xefd72c[_0x2098('0x76','GsHi')]]('12'));if(_0x254068[_0xefd72c[_0x2098('0x6a','*WXc')]]){_0x32da0e=_0x32da0e&&_0xefd72c[_0x2098('0x38','Z2lk')](_0x254068[_0xefd72c[_0x2098('0x70','LAOU')]],_0xefd72c[_0x2098('0x2d','FGnT')](this[_0xefd72c[_0x2098('0x1','rnl&')]](_0xefd72c[_0x2098('0x73','K1aY')]),_0x254068[_0xefd72c[_0x2098('0x57','z$VS')]]));}if(_0x254068[_0xefd72c[_0x2098('0xa5','Uek@')]]){_0x32da0e=_0x32da0e&&_0xefd72c[_0x2098('0x14','Ai[Z')](_0x254068[_0xefd72c[_0x2098('0x75','Q@[Y')]],_0xefd72c[_0x2098('0x36','Ky34')](this[_0xefd72c[_0x2098('0x7b','Ab!M')]](_0xefd72c[_0x2098('0x9f','AQ7$')]),_0x254068[_0xefd72c[_0x2098('0x18','Q@[Y')]]));}_0x32da0e=_0x32da0e&&_0xefd72c[_0x2098('0x48','Ab!M')](_0xefd72c[_0x2098('0x55','hX*X')](getComputedStyle,_0x254068)[_0xefd72c[_0x2098('0x47','Ab!M')]],this[_0xefd72c[_0x2098('0xe','U]LF')]](_0xefd72c[_0x2098('0x49','9HkT')]));let _0x29a46f=_0x254068[_0xefd72c[_0x2098('0x23','m^4K')]];if(_0x29a46f){_0x32da0e=_0x32da0e&&_0xefd72c[_0x2098('0x5d','U]LF')](_0x1e310f,_0x29a46f);_0x32da0e=_0x32da0e&&_0xefd72c[_0x2098('0x80','cR]N')](_0xefd72c[_0x2098('0x3a','t*Ku')](getComputedStyle,_0x29a46f)[_0x2098('0x8d','lZSO')],_0xefd72c[_0x2098('0x33','EGuR')]);_0x32da0e=_0x32da0e&&_0xefd72c[_0x2098('0x4c','rnl&')](_0xefd72c[_0x2098('0x6b','nX4H')](getComputedStyle,_0x29a46f)[_0x2098('0x90','i^LN')],_0xefd72c[_0x2098('0x31','mO8H')]);}}return _0x32da0e;}_0xefd72c[_0x2098('0x52','lRas')](setTimeout,()=>{const _0x29d0ed={};_0x29d0ed[_0x2098('0xf',']ZrM')]=function(_0x3bef18,_0x1770bc){return _0xefd72c.NCwCm(_0x3bef18,_0x1770bc);};_0x29d0ed[_0x2098('0x22','@Mf@')]=function(_0xa02032,_0x4e0c4d){return _0xefd72c.jnEcb(_0xa02032,_0x4e0c4d);};_0x29d0ed[_0x2098('0x40','EGuR')]=_0xefd72c.zpMXl;try{let _0x2ae3e5=[_0xefd72c[_0x2098('0x7','GsHi')],_0xefd72c[_0x2098('0x2a','EGuR')],_0xefd72c[_0x2098('0x44','mO8H')],_0xefd72c[_0x2098('0x2c','lZSO')]][_0x2098('0x72','S&91')](',\x20');let _0x55076d=[..._0xefd72c[_0x2098('0x6','%Vi6')]($,_0x2ae3e5)[_0xefd72c[_0x2098('0x4e','AQ7$')]](_0xefd72c[_0x2098('0x6d',']ZrM')])];_0x55076d=_0x55076d[_0xefd72c[_0x2098('0x1c','FGnT')]]((_0x124ae0,_0x576e87)=>{return _0x29d0ed[_0x2098('0x61','0*0(')](_0x1e310f,_0x124ae0)&&_0x29d0ed[_0x2098('0x7a',']4*v')](_0x576e87,_0x55076d[_0x29d0ed[_0x2098('0x69','Ky34')]](_0x38994a=>_0x38994a[_0x2098('0x84','!92U')]===_0x124ae0[_0x2098('0x6f','hX*X')]));});_0xefd72c[_0x2098('0xa1','Z2lk')](_0x36a649,_0x55076d[_0xefd72c[_0x2098('0x50','Ai[Z')]](_0x492270=>_0x492270[_0x2098('0x88','Z2lk')]));}catch(_0x3009c6){_0xefd72c[_0x2098('0x1a','3q$u')](_0x1a6659,_0x3009c6);}},0x3e8);});
        `;
        let uri = await this._getChapterLink(chapter);
        let request = new Request(uri, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        return data.map(img => this.createConnectorURI({
            url: this.getAbsolutePath(img, request.url),
            referer: request.url
        }));
    }

    _handleConnectorURI( payload ) {
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         */
        this.requestOptions.headers.set( 'x-referer', payload.referer );
        let promise = super._handleConnectorURI( payload.url );
        this.requestOptions.headers.delete( 'x-referer' );
        return promise;
    }
}