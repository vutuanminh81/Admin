class DescriptModel {
    constructor(num_of_Scan, num_of_Search, word_Des_Id, word_Image, word_Pronounce, word_Status, word_Video){
        this.num_of_Scan = num_of_Scan;
        this.num_of_Search = num_of_Search;
        this.word_Des_Id = word_Des_Id;
        this.word_Image = word_Image;
        this.word_Pronounce = word_Pronounce;
        this.word_Status = word_Status;
        this.word_Video = word_Video;
    }
}

class Des{
    constructor(num_of_Scan, num_of_Search){
        this.num_of_Scan = num_of_Scan;
        this.num_of_Search = num_of_Search;
    }
}

module.exports = DescriptModel, Des;