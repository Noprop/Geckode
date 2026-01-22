const starterWorkspace = {
  "blocks": {
      "languageVersion": 0,
      "blocks": [
          {
              "type": "onStart",
              "id": "starter_on_start",
              "x": 38,
              "y": 38,
              "inputs": {
                  "INNER": {
                      "block": {
                          "type": "setProperty",
                          "id": "-ipMU1{4MNA!FEA#d1@z",
                          "fields": {
                              "PROPERTY": "X",
                              "SPRITE": "id_1769093751079_8109"
                          },
                          "inputs": {
                              "VALUE": {
                                  "shadow": {
                                      "type": "math_number",
                                      "id": "dE9bpWxZl3Q]0wiuOwk8",
                                      "fields": {
                                          "NUM": 240
                                      }
                                  }
                              }
                          },
                          "next": {
                              "block": {
                                  "type": "setProperty",
                                  "id": "GMJtBEZ?:G]I,K#:Bz2X",
                                  "fields": {
                                      "PROPERTY": "Y",
                                      "SPRITE": "id_1769093751079_8109"
                                  },
                                  "inputs": {
                                      "VALUE": {
                                          "shadow": {
                                              "type": "math_number",
                                              "id": "7[D::_sLEU21^Qi{.kcZ",
                                              "fields": {
                                                  "NUM": 180
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          },
          {
              "type": "onUpdate",
              "id": "ye5uu!NUDKm*tQtz#J;[",
              "x": 37,
              "y": 250,
              "inputs": {
                  "INNER": {
                      "block": {
                          "type": "setProperty",
                          "id": "p(|/P+rZ[{i6s050y1G/",
                          "fields": {
                              "PROPERTY": "VelocityX",
                              "SPRITE": "id_1769093751079_8109"
                          },
                          "inputs": {
                              "VALUE": {
                                  "shadow": {
                                      "type": "math_number",
                                      "id": "ICf6T1q4GtYiOMrt}h6y",
                                      "fields": {
                                          "NUM": 0
                                      }
                                  }
                              }
                          },
                          "next": {
                              "block": {
                                  "type": "setProperty",
                                  "id": "q934dX_|BwBN}.ok_?3U",
                                  "fields": {
                                      "PROPERTY": "VelocityY",
                                      "SPRITE": "id_1769093751079_8109"
                                  },
                                  "inputs": {
                                      "VALUE": {
                                          "shadow": {
                                              "type": "math_number",
                                              "id": "q#R)KGz(F;yonF#i^9k?",
                                              "fields": {
                                                  "NUM": 0
                                              }
                                          }
                                      }
                                  },
                                  "next": {
                                      "block": {
                                          "type": "controls_if",
                                          "id": "^LJRy*UK^YFM7qXEbQC^",
                                          "inputs": {
                                              "IF0": {
                                                  "shadow": {
                                                      "type": "logic_boolean",
                                                      "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                                      "fields": {
                                                          "BOOL": "TRUE"
                                                      }
                                                  },
                                                  "block": {
                                                      "type": "keyPressed",
                                                      "id": "Y:`4yeOG/Ui6pHCG^]A%",
                                                      "fields": {
                                                          "KEY": "left"
                                                      }
                                                  }
                                              },
                                              "DO0": {
                                                  "block": {
                                                      "type": "changeProperty",
                                                      "id": "Ve#5H/rE{Oq{8}Q.v|5m",
                                                      "fields": {
                                                          "PROPERTY": "velocity.x",
                                                          "SPRITE": "id_1769093751079_8109"
                                                      },
                                                      "inputs": {
                                                          "VALUE": {
                                                              "shadow": {
                                                                  "type": "math_number",
                                                                  "id": "fzCDxI*9sF:Fz]zkQJD~",
                                                                  "fields": {
                                                                      "NUM": -500
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                          },
                                          "next": {
                                              "block": {
                                                  "type": "controls_if",
                                                  "id": "HYH{;3tx)rW+FYLTe9#C",
                                                  "inputs": {
                                                      "IF0": {
                                                          "shadow": {
                                                              "type": "logic_boolean",
                                                              "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                                              "fields": {
                                                                  "BOOL": "TRUE"
                                                              }
                                                          },
                                                          "block": {
                                                              "type": "keyPressed",
                                                              "id": "IMczrXl+Qb9aIq=25YX$",
                                                              "fields": {
                                                                  "KEY": "right"
                                                              }
                                                          }
                                                      },
                                                      "DO0": {
                                                          "block": {
                                                              "type": "changeProperty",
                                                              "id": "4YJ)844j6*.Iqq~al#t}",
                                                              "fields": {
                                                                  "PROPERTY": "velocity.x",
                                                                  "SPRITE": "id_1769093751079_8109"
                                                              },
                                                              "inputs": {
                                                                  "VALUE": {
                                                                      "shadow": {
                                                                          "type": "math_number",
                                                                          "id": "a#GgxOmfG_yd|h~GCVM,",
                                                                          "fields": {
                                                                              "NUM": 500
                                                                          }
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  },
                                                  "next": {
                                                      "block": {
                                                          "type": "controls_if",
                                                          "id": "+Q[Eom5,94}qq|]yVn}4",
                                                          "inputs": {
                                                              "IF0": {
                                                                  "shadow": {
                                                                      "type": "logic_boolean",
                                                                      "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                                                      "fields": {
                                                                          "BOOL": "TRUE"
                                                                      }
                                                                  },
                                                                  "block": {
                                                                      "type": "keyPressed",
                                                                      "id": "$S#*VopOA$QRz1)Y$b!}",
                                                                      "fields": {
                                                                          "KEY": "up"
                                                                      }
                                                                  }
                                                              },
                                                              "DO0": {
                                                                  "block": {
                                                                      "type": "changeProperty",
                                                                      "id": "[B)4h*1iH2S3*L/D{BYx",
                                                                      "fields": {
                                                                          "PROPERTY": "velocity.y",
                                                                          "SPRITE": "id_1769093751079_8109"
                                                                      },
                                                                      "inputs": {
                                                                          "VALUE": {
                                                                              "shadow": {
                                                                                  "type": "math_number",
                                                                                  "id": "5Pa?_#uuk6)ReWC,6T=k",
                                                                                  "fields": {
                                                                                      "NUM": -500
                                                                                  }
                                                                              }
                                                                          }
                                                                      }
                                                                  }
                                                              }
                                                          },
                                                          "next": {
                                                              "block": {
                                                                  "type": "controls_if",
                                                                  "id": "uV^0^lg[JX]7pR$AISs$",
                                                                  "inputs": {
                                                                      "IF0": {
                                                                          "shadow": {
                                                                              "type": "logic_boolean",
                                                                              "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                                                              "fields": {
                                                                                  "BOOL": "TRUE"
                                                                              }
                                                                          },
                                                                          "block": {
                                                                              "type": "keyPressed",
                                                                              "id": "rF@4:79Gl+X|!gp.qwg*",
                                                                              "fields": {
                                                                                  "KEY": "down"
                                                                              }
                                                                          }
                                                                      },
                                                                      "DO0": {
                                                                          "block": {
                                                                              "type": "changeProperty",
                                                                              "id": "Z0dPBJs)wzp}03:v,56h",
                                                                              "fields": {
                                                                                  "PROPERTY": "velocity.y",
                                                                                  "SPRITE": "id_1769093751079_8109"
                                                                              },
                                                                              "inputs": {
                                                                                  "VALUE": {
                                                                                      "shadow": {
                                                                                          "type": "math_number",
                                                                                          "id": "5%9CbyqQ]I%_$WQ?:S})",
                                                                                          "fields": {
                                                                                              "NUM": 500
                                                                                          }
                                                                                      }
                                                                                  }
                                                                              }
                                                                          }
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      ]
  }
}

export default starterWorkspace;
