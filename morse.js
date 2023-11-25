/* global window, jQuery, require, charts */

$(document).ready(function(){
    // alert("読み込み完了");
    var borderon = 2;
    var borderoff = 3;
    
    var short = 100;
    var long  = 300;
    
    var duron  = 0;
    var duroff = 0;
    
    var message = "";
    var char = "";
    
    var lasttime = new Date();
    
    var timer = false;
    
    $(window).keydown(function(e){
        if(e.keyCode !== 32){
            return true;
        }
        
        if(timer){
            clearTimeout(timer);
            timer = false;
        }
        
        var nowtime = new Date();
        duroff = nowtime - lasttime;
        lasttime = nowtime;

        if(char === ""){
            return false;
        }
        
        if((duroff * 2)> (short + long)){
            getchar();
            if(duroff > 2 * long + short){
                getword();
            }
        }
        
        // disp();
        return false;
    });

    $(window).keyup(function(e){
        if(e.keyCode != 32){
            return true;
        }
        var nowtime = new Date();
        duron = nowtime - lasttime;
        lasttime = nowtime;
        
        var key = "";
        
        if((duron * 2)> (short + long)){
            key = "-";
            fixlong(duron);
        }else{
            key = ".";
            fixshort(duron);
        }
        char += key;
        
        disp();
        
        timer = setTimeout(fixchar, (short + long)/2);
        
        return false;
    });
    
    $("#button1").click(function(e){
        message = "";
        disp();
    });

    function fixchar(){
        timer = false;
        getchar();  
        disp();

        timer = setTimeout(fixword, (2 * short + long));
    }
    function fixword(){
        timer = false;
        getword();  
        disp();
    }
    
    function disp(){
        var str = "";
//        str += "on  :" + duron  + "\n";
//        str += "off :" + duroff + "\n";
//        str += "shrt:" + short  + "\n";
//        str += "long:" + long   + "\n";
        
        str += message;
        str += char;
        $("#text1").text(str);
    }
    
    function getchar(){
        var m = words[char];
        message += m ? m : "?";
        char = "";
        return false;
    }
    function getword(){
        message += " ";
        return false;
    }
    
    function fixshort(dur){
        short = (7 * short + dur) / 8;
        return false;
    }
    function fixlong(dur){
        long = (7 * long + dur) / 8;
        return false;
    }

    var words, wordse;
/*
    $.getJSON("morse.json", function(data){
        words  = data.words;
        wordse = data.wordse;
        alert(words);
    });
 */
    
    jsondata = 
    {
        "words" : {
            ".-":"イ",
            ".-.-":"ロ",
            "-...":"ハ",
            "-.-.":"ニ",
            "-..":"ホ",
            ".":"ヘ",
            "..-..":"ト",
            "..-.":"チ",
            "--.":"リ",
            "....":"ヌ",
            "-.--.":"ル",
            ".---":"ヲ",
            "-.-":"ワ",
            ".-..":"カ",
            "--":"ヨ",
            "-.":"タ",
            "---":"レ",
            "---.":"ソ",
            ".--.":"ツ",
            "--.-":"ネ",
            ".-.":"ナ",
            "...":"ラ",
            "-":"ム",
            "..-":"ウ",
            ".-..-":"ヰ",
            "..--":"ノ",
            ".-...":"オ",
            "...-":"ク",
            ".--":"ヤ",
            "-..-":"マ",
            "-.--":"ケ",
            "--..":"フ",
            "----":"コ",
            "-.---":"エ",
            ".-.--":"テ",
            "--.--":"ア",
            "-.-.-":"サ",
            "-.-..":"キ",
            "-..--":"ユ",
            "-...-":"メ",
            "..-.-":"ミ",
            "--.-.":"シ",
            ".--..":"ヱ",
            "--..-":"ヒ",
            "-..-.":"モ",
            ".---.":"セ",
            "---.-":"ス",
            ".-.-.":"ン",
            ".----":"1",
            "..---":"2",
            "...--":"3",
            "....-":"4",
            ".....":"5",
            "-....":"6",
            "--...":"7",
            "---..":"8",
            "----.":"9",
            "-----":"0",
            "..":"゛", // 濁点",
            "..--.":"゜", // 半濁点",
            ".--.-":"ー", // 長音「ー」",
            ".-.-.-":"、", // 区切点「、」",
            ".-.-..":"\n", // 段落「」」",
            "-.--.-":"（", // 下向き括弧「（」",
            ".-..-.":"）", // 上向き括弧「）」",
            "-..---":"本文", //  ※「ホレ」と表現される",
            "...-.":"訂正.終了", //  ※「ラタ」と表現される",
            "xxx":"xxx"
        },
        "wordse" : {
            ".-":"A",
            "-...":"B",
            "-.-.":"C",
            "-..":"D",
            ".":"E",
            "..-.":"F",
            "--.":"G",
            "....":"H",
            "..":"I",
            ".---":"J",
            "-.-":"K",
            ".-..":"L",
            "--":"M",
            "-.":"N",
            "---":"O",
            ".--.":"P",
            "--.-":"Q",
            ".-.":"R",
            "...":"S",
            "-":"T",
            "..-":"U",
            "...-":"V",
            ".--":"W",
            "-..-":"X",
            "-.--":"Y",
            "--..":"Z",
            ".-.-.-":".", // ピリオド「.」",
            "--..--":",", // コンマ「,」",
            "..--..":"?", // 疑問符「?」",
            "-.-.--":"!", // 感嘆符「!」",
            "-....-":"-", // ハイフン「-」",
            "-..-.":"/", // 斜線「/」",
            ".--.-.":"@", // アットマーク「@」",
            "-.--.":"(", // 左括弧「(」",
            "-.--.-":")", // 右括弧「)」",
            "........":"訂正", //  ※「HH」と表現される",
            "-...-":"送信開始", //  ※「BT」と表現される",
            ".-.-.":"送信終了", //  ※「AR」と表現される",
            "...-.-":"通信終了", //  ※「VA」と表現される",
            "-.-":"送信要求", // （Kと同じ）
            ".-...":"待機要求", //  ※「AS」と表現される",
            "...-.":"了解",
            "xxx":"xxx"
        }
    };
    words  = jsondata.words;
    wordse = jsondata.wordse;
        
});