let express = require('express');
let app = express();

const PORT = process.env.port || 3000;

class Node {
    constructor (data, prev, next) {
        this.data = data;
        this.next = next || null; 
        this.prev = prev || null; 
    }
} 

class LinkedList {
    constructor (){
        // this.length = 0;
        this.head = this.tail =  null;
    }

    latest(){
        if (!this.tail){
            return null;
        }
        return this.tail.data;
    }

    append(data) {
        // check if the list is empty -> initial with a new Node
        if (!this.tail) {
            this.head = this.tail = new Node(data)
        } else {
            let oldTail = this.tail;
            this.tail = new Node(data);
            oldTail.next = this.tail;
            this.tail.prev = oldTail;
        }
    }

    prepend(data) {
        // check if the list is empty -> initial with a new Node
        if (!this.tail) {
            this.head = this.tail = new Node(data)
        } else {
            let oldHead = this.head;
            this.head = new Node(data);
            oldHead.prev = this.head;
            this.head.next = oldHead;
        }
    }

    deleteHead() {
        // check if the list is empty
        if(!this.head) {
            return null;
        } else {
            let removeHead = this.head;
            if (removeHead === this.tail) {
                this.head = this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
            return removeHead.data;
        }
    }

    deleteTail() {
        // check if the list is empty
        if(!this.tail) {
            return null;
        } else {
            let removeTail = this.tail;
            if (removeTail === this.head) {
                this.head = this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            return removeHead.data;
        }
    }

    //search node by id
    search(unitCodeToSearch) {
        let currentNode = this.head;

        while (currentNode) {
            if(currentNode.data.unitCode === unitCodeToSearch) {
                return currentNode.data;
            }
            currentNode = currentNode.next
        }
        return null;
    }

    getList() {
        let currentNode = this.head;
        let value = [];

        while (currentNode) {
            value.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return value;
    }
}

// A progress object to pass into linked list
let progress = [
    {
        unitCode: "SIT725",
        unitName: "Software Engineering",
        numberGrade: 60,
        letterGrade: "C"
    },
    {
        unitCode: "SIT430",
        unitName: "Honour Project A",
        numberGrade: 70,
        letterGrade: "D"
    }
]


// A linked list of academic progresses
let studentA = new LinkedList();

// Each node in the linked list store a progress object detailing student's progress
// studentA.append(progress[0]);
// studentA.append(progress[1]);

// serve static files
app.use(express.static(__dirname + '/public'));

app.get('/result', (req,res) => {
    let unitCode = req.query.unitCode;
    let unitName = req.query.unitName;
    let numberGrade = req.query.numberGrade;
    let letterGrade = req.query.letterGrade;

    let achivement = {
        timeStamp: Math.floor( Date.now() / 1000 ),
        unitCode,
        unitName,
        numberGrade,
        letterGrade,
    }

    studentA.append(achivement)

    res.send(`${achivement.unitCode} has been added`);
})

app.get('/test', (req,res) => {
    // let latest = studentA.latest();
    let studentAList = studentA.getList();
    let dataToSend = JSON.stringify(studentAList);
    // dataToSend = JSON.stringify(dataToSend);

    // res.json(latest);
    res.send(dataToSend);
})

app.get('/search', (req,res) => {
    let unitCode = req.query.unitCode;

    let result = studentA.search(unitCode);
    let dataToSend = JSON.stringify(result);

    res.send(dataToSend);
})

app.listen(PORT, () => {
    console.log('Server is listening on port ', PORT);
})