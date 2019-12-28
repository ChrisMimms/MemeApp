class Meme 
{
    // Constructs the meme with the provided URL.
    constructor(memeID, url, title, likeNumber = 0) 
    {
      this._url = url;
      this._likeNumber = likeNumber;
      this._title = title;
      this._id = memeID;
    }

    get ID() 
    {
      return this._id;
    }
  
    get URL() 
    {
      return this._url;
    }
  
    get likeNumber() 
    {
      return this._likeNumber;
    }

    set likeNumber(likeNumber) 
    {
      this._likeNumber = likeNumber;
    }
  
    get title() 
    {
      return this._title;
    }
}
  
class MemeController 
{
    constructor(memes, currentMemeID) 
    
    {
    this._memes = memes;
    this._currentMeme = memes[currentMemeID];
    this.setCurrentMeme(memes[currentMemeID]);
  
    /* 
    Set the handler for the Next button. It will go to the next meme.
    Use self to capture the this object. Otherwise, this will refer to 
    the button object, not the controlle object! 
    This is why knowing Scope & Closure is important!
    */
    self = this;
    $("#next-image-id").click(function() 
    {
        self.nextMeme();
    });

    $("#prev-image-id").click(function() 
    {
        self.previousMeme();
    });

    $("#like-button-id").click(function() 
    {
        self.like();
    });
      
    $("#dislike-button-id").click(function() 
    {
        self.dislike();
    });
    }
  
    setCurrentMeme(meme) 
    {
        this._currentMeme = meme;

        // Get the element with the ID "meme-image-id" and replace the
        // source with the URL of the current meme.
        $("#meme-image-id").attr("src", meme.URL);
        $("#meme-title-id").text(meme.title);
        this.updateLikeNumberElement(this._currentMeme.likeNumber);
    }
  
    updateLikeNumberElement(likeNumber) 
    {
        $("#meme-likes-id").text(likeNumber + " Likes");
    }
  
    nextMeme() 
    {
        var nextMemeID = (this._currentMeme.ID + 1) % this._memes.length;
        var nextMeme = this._memes[nextMemeID];
        if (nextMeme) this.setCurrentMeme(nextMeme);
    }
  
    previousMeme() 
    {
        var previousMemeID = ((this._currentMeme.ID - 1) + this._memes.length) % this._memes.length;
        var previousMeme = this._memes[previousMemeID];
        if (previousMeme) this.setCurrentMeme(previousMeme);
    }
  
    like() 
    {
        this._currentMeme.likeNumber++;
        var likeNumber = this._currentMeme.likeNumber;
        this.updateLikeNumberElement(likeNumber);
    }
  
    dislike() 
    {
        this._currentMeme.likeNumber--;
        var likeNumber = this._currentMeme.likeNumber;
        this.updateLikeNumberElement(likeNumber);
    }
  }
  
  var memes = [];

  // AJAX GET REQUEST
  $.ajax(
    {
        url: "https://javascriptclass-22d93.firebaseio.com/memes.json?print=pretty", 
        success: function(data) 
        {
            var i = 0;
            for (var id in data) 
            {
                // print the data to console to see structure
                // cosole.log(data);
                var meme = data[id]; 
                memeURL = meme["url"]; 
                memeTitle = meme["title"]; 
                memeLikeNumber = meme["like_count"]; 
                var aMeme = new Meme(i, memeURL, memeTitle, memeLikeNumber);
                memes.push(aMeme);
                i++
            }
            var memeCtrl = new MemeController(memes, 0);
        }
      });