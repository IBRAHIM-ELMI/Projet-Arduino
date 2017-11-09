#include<SoftwareSerial.h>

int sensorPin = A0; // select the input pin for the LDR
int sensorValue = 0; // variable to store the value coming from the sensor
int led = 9; // Output pin for LED

void setup() {
  // declare the ledPin and buzzer as an OUTPUT:
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  if (sensorValue < 100)
  {
    Serial.println(sensorValue);
    digitalWrite(led,HIGH);
    delay(1000);
  }else{
    Serial.println(sensorValue);
  }
  digitalWrite(led,LOW);
  delay(2000);
}
