// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
let organismNum = 1;
const pAequorFactory = (specimenNum, dna) => {
  organismNum += 1;
  return {
    specimenNum,
    dna,
    mutate() {
      let indexNum = Math.floor(Math.random() * 15)
      let oldBase = dna[indexNum]
      //console.log(indexNum)
      //console.log(oldBase)
      while (oldBase === dna[indexNum]){
        dna[indexNum] = returnRandBase()
        //console.log(dna[indexNum])
      }
      return dna;
    },
    compareDNA(pAequor) {
      let match = 0;
      for (let i = 0; i < this.dna.length; i++){
        if (this.dna[i] === pAequor.dna[i]){
          match += 1;
        }
      }
      let matchPercentage = (match/this.dna.length) * 100
      //console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${matchPercentage.toFixed(2)}% DNA in common.`)
      return matchPercentage
    },
    willLikelySurvive() {
      let match = 0;
      for (let i = 0; i < this.dna.length; i++){
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          match += 1;
        }
      }
      let matchPercentage = (match/this.dna.length) * 100
      if (matchPercentage >= 60) {
        return true;
      }
      else {
        return false;
      }
    },
    complementStrand() {
      let dnaStrand2 = []
      for (let i = 0; i < this.dna.length; i++){
        switch (this.dna[i]){
          case 'A':
            dnaStrand2.push('T');
            break;
          case 'T':
            dnaStrand2.push('A');
            break;
          case 'C':
            dnaStrand2.push('G');
            break;
          case 'G':
            dnaStrand2.push('C');
            break;
        }
      }
      return dnaStrand2;
    }
  }
}

let sample = [];
while (sample.length < 30){
  let specimen = pAequorFactory(organismNum, mockUpStrand())
  if(specimen.willLikelySurvive()){
    sample.push(specimen);
  }
}
let topPercent = 0
let firstSpec = null;
let secondSpec = null;
for (let i = 0; i < sample.length-1; i++){
  for(let j = i + 1; j < sample.length; j++){
    let percent = sample[i].compareDNA(sample[j])
    if (percent > topPercent){
      topPercent = percent;
      firstSpec = sample[i];
      secondSpec = sample[j];
    }
  }
}

console.log(sample)
console.log (sample[29].complementStrand())
console.log((`Specimen #${firstSpec.specimenNum} and specimen #${secondSpec.specimenNum} are the most related instances of pAequor with a ${topPercent.toFixed(2)}% DNA match.`))
/*const spec1 = pAequorFactory(organismNum, mockUpStrand())
const spec2 = pAequorFactory(organismNum, mockUpStrand())
console.log(spec1);
console.log(spec2);
console.log(spec1.compareDNA(spec2));
console.log(spec1.willLikelySurvive())*/






