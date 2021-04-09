class Test {
    constructor(){
        this.name = 'saniul'
    }

    static sta(){
        var test = new Test;
        test.sh()
        console.log(test.name)
    }

    sh(){
        console.log("i am in sh method", this.name)
    }

    show(){
        this.sh()
        Test.sta()
    }
}

// var t = new Test;
// t.show();
Test.sta()