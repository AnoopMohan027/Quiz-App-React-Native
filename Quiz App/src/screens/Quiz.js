import { Animated, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZE } from '../constants'
// import data from '../data/QuizData'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect } from 'react'
import axios from 'axios'


const Quiz = () => {



    const allQuestions = async () => {
        // axios.get('http://172.16.5.26:5000')
        //     .then((response) => {

        //         console.log('ghhhheje', response)
        //     })
        //     .then(results => {
        //         return results.json();
        //         })
        //         console.log(results)
        //         .then(results => {
        //         console.log(results.question);
        //         });

        try {
            const response = await axios.get('http://192.168.1.119:5000')
            //  console.log(response.data)
            const myRepo = response.data
            setQuestionsall(myRepo)
            console.log(myRepo)
        } catch (err) {
            console.log(err)
        }


        // const url = 'http://172.16.5.26:5000'
        // const res = await fetch(url)
        // const data = await res.json()
        // const data = await fetch('http://172.16.5.26:5000').json()
        //console.log('asdas',data)
        //const data = await res.json()
        //console.log(data.results[0])
        //console.log(data.results.question)
        //setCurrentQuestionIndex(data.length)

        // use it
        // setCurrentQuestionIndex(data[0].questions)
        // setOption(data[0].options)
        // console.log(data[0].answer)
        // setCorrectOption(data[0].answer)
        // setQuestionCount(data.length)



        //currentQuestionIndex(data[0].questions)

        //console.log(data[0].questions)



        // console.log(data.length)


    };


    // const values = () => {
    //     questions: currentQuestionIndex
    //     options: correctOption
    //     answer: currentOptionSelected


    //  }
    // const allQuestions = () => {
    //     axios.get('http://172.16.5.26:5000', values)
    //     ///   setCurrentQuestionIndex(values.questions)
    //     setCurrentQuestionIndex(data.length)
    //     setCurrentQuestionIndex(data[0].questions)
    //     // .then(function (response) {
    //     //     // handle success
    //     // })
    //     // .catch(function (error) {
    //     //     // handle error
    //     //     //  alert(error.message);
    //     // })
    //     // .finally(function () {
    //     //     // always executed
    //     //     //   alert('Finally called');
    //     // });
    // };



    useEffect(() => {
        allQuestions()
    }, [])


    // const allQuestions = data;

    const [questionsall, setQuestionsall] = useState([])

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState('')

    const [questionCount, setQuestionCount] = useState()

    const [option, setOption] = useState([])

    const [currentOptionSelected, setCurrentOptionSelected] = useState(null)

    const [correctOption, setCorrectOption] = useState()

    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);

    const [score, setScore] = useState(0)

    const [showNextButton, setShowNextButton] = useState(false)

    const [showScoreModal, setShowScoreModal] = useState(false)

    const [progress, setProgress] = useState(new Animated.Value(0))



    const validateAnswer = (selectedOption) => {
        let correct_option = decodeURIComponent([option]);
        setCurrentOptionSelected(selectedOption)
        setCorrectOption(correct_option)
        setIsOptionsDisabled(true)
        if (selectedOption == correct_option) {
            //set Score
            setScore(score + 1)
        }
        //show next button
        setShowNextButton(true)

    }

    const handelNext = () => {
        if (currentQuestionIndex == setCurrentQuestionIndex[0]) {
            //last question

            //score modal
            setShowScoreModal(true)
        } else {
            alert('hi')
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setCurrentOptionSelected(null)
            setCorrectOption(null)
            setIsOptionsDisabled(false)
            setShowNextButton(false)
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    const retryQuiz = () => {
        setShowScoreModal(false)
        setCurrentQuestionIndex(0)
        setScore(0)
        setCurrentOptionSelected(null)
        setCorrectOption(null)
        setIsOptionsDisabled(false)
        setShowNextButton(false)
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })


    const renderQuestion = () => {
        return (
            <View>
                {
                    questionsall.map((myRepo) =>
                        <View>
                            {/* question counter */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }} >{decodeURIComponent(setQuestionCount.length)}</Text>
                                <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }} >/ {decodeURIComponent(questionCount)}</Text>
                            </View>
                            {/* questions */}
                            <View>
                                {/* <Text style={{
                                    color: COLORS.white,
                                    fontSize: 30
                                }} >
                                    {decodeURIComponent(allQuestions[currentQuestionIndex]?.questions)}
                                </Text> */}
                                <Text style={{
                                    color: COLORS.white,
                                    fontSize: 30
                                }} >
                                    {myRepo.questions}
                                </Text>


                            </View>
                        </View>
                    )
                }
            </View>
        )
    }


    const renderOptions = () => {
        return (
            <View>
                {
                    option.map(options => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={options}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.sucess
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.secondary + '40',
                                backgroundColor: option == correctOption
                                    ? COLORS.sucess + '20'
                                    : option == currentOptionSelected
                                        ? COLORS.error + '20'
                                        : COLORS.secondary + '20',
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10

                            }}
                        >
                            <Text style={{ color: COLORS.white, fontSize: 20, }}>{decodeURIComponent([options])}</Text>

                            {/* show yes or no */}

                            {
                                option == correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.sucess,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }



                        </TouchableOpacity>
                    ))
                }
            </View>
        )

    }


    const renderNextButton = () => {

        if (showNextButton) {
            return (
                <TouchableOpacity onPress={() => handelNext()} style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }} >
                    <Text style={{ color: COLORS.white, fontSize: 20, textAlign: 'center' }}>Next</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }

    }


    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: 'red'
            }} >
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                }, {
                    width: progressAnim
                }]
                } >

                </Animated.View>
            </View>
        )
    }







    return (
        <SafeAreaView style={{ flex: 1 }} >
            <StatusBar barStyle={"light-content"} backgroundColor={COLORS.primary} />
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative',
            }} >

                {/* progressBar */}
                {renderProgressBar()}

                {/* Questions */}
                {renderQuestion()}

                {/* options */}
                {renderOptions()}

                {/* next button */}
                {renderNextButton()}

                {/* scoremodal */}

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >

                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }} >
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }} >{score > (allQuestions.length / 2) ? 'Congratulation' : 'oops!'}</Text>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score > (allQuestions.length / 2) ? COLORS.sucess : COLORS.error
                                }} >{score}</Text>
                                <Text style={{ fontSize: 20, color: COLORS.black }}>/{allQuestions.length}</Text>
                            </View>
                            {/* RETRY */}
                            <TouchableOpacity
                                onPress={retryQuiz}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20,
                                    width: '100%',
                                    borderRadius: 20
                                }} >
                                <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 20 }} >Retry Quiz</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Modal>

                {/* backgroundimage */}



            </View>
        </SafeAreaView>
    )
}

export default Quiz

const styles = StyleSheet.create({})