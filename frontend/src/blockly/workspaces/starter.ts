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
              "id": "starter_set_property",
              "fields": {
                "PROPERTY": "X"
              },
              "inputs": {
                "VALUE": {
                  "block": {
                    "type": "math_number",
                    "id": "starter_math_number",
                    "fields": {
                      "NUM": 25
                    }
                  }
                }
              },
              "next": {
                "block": {
                  "type": "setProperty",
                  "id": "GMJtBEZ?:G]I,K#:Bz2X",
                  "fields": {
                    "PROPERTY": "Y"
                  },
                  "inputs": {
                    "VALUE": {
                      "shadow": {
                        "type": "math_number",
                        "id": "7[D::_sLEU21^Qi{.kcZ",
                        "fields": {
                          "NUM": 25
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
                      "PROPERTY": "x"
                    },
                    "inputs": {
                      "VALUE": {
                        "shadow": {
                          "type": "math_number",
                          "id": "fzCDxI*9sF:Fz]zkQJD~",
                          "fields": {
                            "NUM": -10
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
                          "PROPERTY": "x"
                        },
                        "inputs": {
                          "VALUE": {
                            "shadow": {
                              "type": "math_number",
                              "id": "a#GgxOmfG_yd|h~GCVM,",
                              "fields": {
                                "NUM": 10
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
                              "PROPERTY": "y"
                            },
                            "inputs": {
                              "VALUE": {
                                "shadow": {
                                  "type": "math_number",
                                  "id": "5Pa?_#uuk6)ReWC,6T=k",
                                  "fields": {
                                    "NUM": -10
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
                                  "PROPERTY": "y"
                                },
                                "inputs": {
                                  "VALUE": {
                                    "shadow": {
                                      "type": "math_number",
                                      "id": "5%9CbyqQ]I%_$WQ?:S})",
                                      "fields": {
                                        "NUM": 10
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
