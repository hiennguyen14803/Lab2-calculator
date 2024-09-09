import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#00b9d6',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '45%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    }
  });
  
  // MANG BUTTON
  const buttons = ['C', 'DEL', '/', 'Sin', 'cos', '^2', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '', '.', '='];

  // HÀM NHẬP 
  function handleInput(buttonPressed) {
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      Vibration.vibrate(35); // KÍCH HOẠT RUNG
      setCurrentNumber(currentNumber + buttonPressed); // CẬP NHẬT CHUỖI
      return;
    } else if (
      buttonPressed === 1 ||
      buttonPressed === 2 ||
      buttonPressed === 3 ||
      buttonPressed === 4 ||
      buttonPressed === 5 ||
      buttonPressed === 6 ||
      buttonPressed === 7 ||
      buttonPressed === 8 ||
      buttonPressed === 9 ||
      buttonPressed === 0 ||
      buttonPressed === '.'
    ) {
      Vibration.vibrate(35);
    }
  
    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'C':
        Vibration.vibrate(35);
        setCurrentNumber('');
        setLastNumber('');
        return;
      case '=':
        if(currentNumber.length > 0){
          Vibration.vibrate(35);
          setLastNumber(currentNumber);
          calculator();
          return;
        }else {
          setCurrentNumber('');
          return;
        }
      case '^2':
        Vibration.vibrate(35);
        setCurrentNumber((Math.pow(parseFloat(currentNumber), 2)).toString());
        return;
      case 'Sin':
        Vibration.vibrate(35);
        calculateTrig('sin');
        return;
      case 'cos':
        Vibration.vibrate(35);
        calculateTrig('cos');
        return;
    }
  
    setCurrentNumber(currentNumber + buttonPressed);
  }

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
      setCurrentNumber(currentNumber);
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }

  // Tính toán hàm lượng giác
  function calculateTrig(func) {
    let num = parseFloat(currentNumber);
    let radians = (num * Math.PI) / 180; // Chuyển đổi độ sang radian
    let result = '';

    switch (func) {
      case 'sin':
        result = Math.sin(radians).toString();
        break;
      case 'cos':
        result = Math.cos(radians).toString();
        break;
    }

    setCurrentNumber(result);
  }

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* THAY ĐỔI ĐỊNH DẠNG CÁC NÚT */}
      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' || button === '^2' ?
              <TouchableOpacity key={button} style={[styles.button, { backgroundColor: '#00b9d6' }]} onPress={() => handleInput(button)}>
                <Text style={[styles.textButton, { color: 'white', fontSize: 28 }]}>{button}</Text>
              </TouchableOpacity>
            :
          button === 'DEL' || button === 'C' ?
              <TouchableOpacity key={button} style={[styles.button, { backgroundColor: darkMode ? '#414853' : '#ededed', minWidth: '36%' }]} onPress={() => handleInput(button)}>
                <Text style={styles.textButton}>{button}</Text>
              </TouchableOpacity>
            :
          button === 'Sin' || button === 'cos' ?
              <TouchableOpacity key={button} style={[styles.button, { backgroundColor: darkMode ? '#414853' : '#ededed', minWidth: '36%' }]} onPress={() => handleInput(button)}>
                <Text style={styles.textButton}>{button}</Text>
              </TouchableOpacity>
            :
          <TouchableOpacity key={button} style={[styles.button, { backgroundColor: darkMode ? '#303946' : '#fff' }]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
