#!/bin/bash -e

#RIG_CTL="rigctl -m 373 -r /dev/ttyUSBicom -s 115200"
LOCAL_RIG_CTL="nc -w 5 127.0.0.1 4532"

protocol_text=$1
# format is: rig-qsy://14063000
freq_hz=${protocol_text#"rig-qsy://"}
echo "Tuning rig to $freq_hz Hz"
  
function qsy_to_freq() {
  if [[ $RIG_CTL ]]; then
    echo "Changing freq with: ${RIG_CTL} F ${freq_hz}"
    set_freq_response=$(${RIG_CTL} F "${freq_hz}")
  else
    set_freq_response=$(echo "F ${freq_hz}" | ${LOCAL_RIG_CTL} | head -n 1)
  fi
  echo "Finished change command, response is: ${set_freq_response}"
  
  # The set frequency call sometimes returns "rigctl set_freq: error = IO error" but still worked,
  # so check the actual freq.
  # But also the query call sometimes returns an error, so retry a few times.
  for i in 1 2 3
  do
    sleep 0.5
    if [[ $RIG_CTL ]]; then
      get_set_freq_response=$(${RIG_CTL} f)
    else
      get_set_freq_response=$(echo "f" | ${LOCAL_RIG_CTL} | head -n 1)
    fi
    echo "Freq query response $i: ${get_set_freq_response}"
  
    if [ "$freq_hz" == "$get_set_freq_response" ]; then
      echo "Success, frequency changed!"
      return 0
    else
      echo "Problem changing freq:\n${get_set_freq_response}"
    fi
  done
  zenity --error \
        --width=300 \
        --height=100 \
        --text "Problem changing freq:\n${get_set_freq_response}"
}

qsy_to_freq
